import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IFileUploadModel, IQueryOperatorEnum } from '@studiz/shared/types/frontend';
import { catchError, concatAll, from, of, switchMap, takeWhile, tap, timer } from 'rxjs';
import { computed, inject } from '@angular/core';
import { FileUploadFrontendService } from '@studiz/frontend/file-upload-frontend-service';

const fileIcons: Record<string, string> = {
  'default': 'file',
  'image/jpeg': 'file-jpg',
  'image/png': 'file-png',
  'image/svg': 'file-svg'
};

type FileUpload = {
  id: number,
  progress?: number;
  hasError?: boolean;
  errorMessage?: string;
  uploading?: boolean;
  url?: string;
  file?: File;
  fileUpload?: IFileUploadModel | null
};

interface FileUploadState {
  multiple: boolean,
  fileUploads: FileUpload[];
}

const initialState: FileUploadState = {
  multiple: false,
  fileUploads: []
};

export default signalStore(
  withState(initialState),
  withMethods((store) => {
    const fileUploadService = inject(FileUploadFrontendService);

    const storeFileUploads = (fileUploads: FileUploadState['fileUploads']) => {
      if (store.multiple()) {
        patchState(store, { fileUploads: { ...fileUploads } });
      } else if (fileUploads.length > 0) {
        patchState(store, { fileUploads: [{ ...fileUploads[fileUploads.length - 1] }] });
      } else {
        patchState(store, { fileUploads: [] });
      }
    };

    const updateFileUploadProp = <T extends keyof FileUpload>(prop: T, i: number, val: FileUpload[T]) => {
      const fileUploads = [...store.fileUploads()];
      if (!store.multiple()) {
        console.log({ val, i, prop });
        fileUploads[0][prop] = val;
      } else {
        fileUploads[i][prop] = val;
      }

      storeFileUploads(fileUploads);
    };

    const setMultiple = (multiple: boolean) => {
      patchState(store, { multiple });
    };

    const loadImages = (imageIds: { id: number } []) => {
      fileUploadService.getItems({
        filters: [
          {
            values: [],
            value: imageIds.map(({ id }) => id).join(','),
            operator: IQueryOperatorEnum.In,
            field: 'id'
          }
        ]
      }).subscribe({
        next: (result) => {
          if (result.items) {
            const fileUploads = result.items.map((item) => ({
              id: Math.random(),
              progress: 100,
              hasError: false,
              uploading: false,
              fileUpload: item
            }));
            storeFileUploads(fileUploads);
          }
        }
      });
    };

    const removeFile = (i: number) => {
      const fileUploads = [...store.fileUploads()];
      fileUploads.splice(i, 1);
      storeFileUploads(fileUploads);
    };
    const addFiles = (fileList: FileList) => {
      const files = Array.from(fileList) as File[];
      const fileUploads = [
        ...store.fileUploads(),
        ...files.map((file) => ({
          file,
          url: URL.createObjectURL(file),
          progress: 0,
          hasError: false,
          uploading: true,
          fileUpload: null,
          id: Math.random()
        }))
      ];
      storeFileUploads(fileUploads);
      from(store.fileUploads().map((file, i) =>
        of(true).pipe(
          tap(() => {
            if (file.uploading) {
              timer(200, 50).pipe(
                takeWhile(() => Number(file.progress) < 99)
              ).subscribe({
                next: (progress) => {
                  updateFileUploadProp<'progress'>('progress', i, Math.round(Math.min(progress + ((100 - progress) / 10), 99)));
                }
              });
            }
          }),
          switchMap(() => {
            if (!file.uploading) {
              return of(false);
            }

            return fileUploadService.uploadFile(file.file).pipe(
              tap((res) => {
                updateFileUploadProp<'progress'>('progress', i, 100);
                updateFileUploadProp<'uploading'>('uploading', i, false);
                updateFileUploadProp<'fileUpload'>('fileUpload', i, res.data?.uploadSingleFile?.data as IFileUploadModel);
                storeFileUploads([...store.fileUploads()]);
              }),
              catchError((res) => {
                updateFileUploadProp<'progress'>('progress', i, 100);
                updateFileUploadProp<'uploading'>('uploading', i, false);
                updateFileUploadProp<'hasError'>('hasError', i, true);
                updateFileUploadProp<'errorMessage'>('errorMessage', i, res.message ? (res.message ?? 'Error uploading file') : undefined);
                return of(true);
              })
            );
          })
        )
      )).pipe(
        concatAll()
      ).subscribe();

    };
    return { addFiles, removeFile, loadImages, setMultiple };
  }),
  withComputed((store) => {
    const fileUploadsWithIcons = computed(() => {
        return store.fileUploads().map((file) => ({
          ...file,
          icon: fileIcons[file.fileUpload?.mimetype as string] ? fileIcons[file.fileUpload?.mimetype as string] : fileIcons['default']
        })).reverse();
      }
    );

    const fileUploadValue = computed(() => {
      const fileUploads = [...store.fileUploads()];
      return (
        store.fileUploads()
          .map((item) => ({
            ...item.fileUpload
          }))
        // .filter((item) => item?.id ? item : [])
      ) as IFileUploadModel[];
    });

    return { fileUploadsWithIcons, fileUploadValue };
  })
);
