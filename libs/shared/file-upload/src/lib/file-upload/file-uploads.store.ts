import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IFileUploadModel } from '@studiz/shared/types/frontend';
import { catchError, concatAll, from, of, switchMap, takeWhile, tap, timer } from 'rxjs';
import { computed, inject } from '@angular/core';
import { FileUploadFrontendService } from '@studiz/frontend/file-upload-frontend-service';

const fileIcons: Record<string, string> = {
  'default': 'file',
  'image/jpeg': 'file-jpg',
  'image/png': 'file-png',
  'image/svg': 'file-svg'
};

interface FileUploadState {
  fileUploads: {
    progress?: number;
    hasError?: boolean;
    uploading?: boolean;
    url: string;
    file?: File;
    fileUpload?: IFileUploadModel | null
  }[];
}

const initialState: FileUploadState = {
  fileUploads: []
};

export default signalStore(
  withState(initialState),
  withMethods((store) => {
    const fileUploadService = inject(FileUploadFrontendService);
    const setUploadProgress = (i: number, progress: number) => {
      const fileUploads = [...store.fileUploads()];
      fileUploads[i].progress = progress;
      patchState(store, { fileUploads });
    };
    const setIsUploading = (i: number, uploading: boolean) => {
      const fileUploads = [...store.fileUploads()];
      fileUploads[i].uploading = uploading;
      patchState(store, { fileUploads });
    };
    const setErrorStatus = (i: number, status: boolean) => {
      const fileUploads = [...store.fileUploads()];
      fileUploads[i].hasError = status;
      patchState(store, { fileUploads });
    };
    const setUploadedFile = (i: number, fileUpload: IFileUploadModel | null) => {
      const fileUploads = [...store.fileUploads()];
      fileUploads[i].fileUpload = fileUpload;
      patchState(store, { fileUploads });
    };
    const addFiles = (fileList: FileList) => {
      const files = Array.from(fileList) as File[];
      patchState(store, {
        fileUploads: [
          ...store.fileUploads(),
          ...files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            progress: 0,
            hasError: false,
            uploading: true,
            fileUpload: null
          }))
        ]
      });

      from(store.fileUploads().map((file, i) =>
        of(true).pipe(
          tap(() => {
            if (file.uploading) {
              timer(100, 50).pipe(
                takeWhile(() => Number(file.progress) < 99)
              ).subscribe({
                next: (progress) => {
                  setUploadProgress(i, Math.round(Math.min(progress + ((100 - progress) / 10), 99)));
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
                console.log(file.file)
                setUploadProgress(i, 100);
                setIsUploading(i, false);
                setUploadedFile(i, res.data?.uploadSingleFile?.data as IFileUploadModel);
              }),
              catchError((res) => {
                setUploadProgress(i, 100);
                setIsUploading(i, false);
                setErrorStatus(i, true);
                return of(true);
              })
            );
          })
        )
      )).pipe(
        concatAll()
      ).subscribe();

    };
    return { addFiles };
  }),
  withComputed((store) => {
    const fileUploadsWithIcons = computed(() => {
        return store.fileUploads().map((file) => ({
          ...file,
          icon: fileIcons[file.fileUpload?.mimetype as string] ? fileIcons[file.fileUpload?.mimetype as string] : fileIcons['default']
        }));
      }
    );

    return { fileUploadsWithIcons };
  })
);
