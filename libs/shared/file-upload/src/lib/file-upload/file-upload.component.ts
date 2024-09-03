import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  Optional,
  Self,
  signal,
  untracked,
  viewChild
} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRow,
  IonSkeletonText,
  IonText
} from '@ionic/angular/standalone';
import { JsonPipe, NgStyle, PercentPipe } from '@angular/common';
import { IFileUploadModel, IQueryOperatorEnum } from '@studiz/shared/types/frontend';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { BACKEND_URL } from '@studiz/frontend/constants';
import { FileSizePipe } from './file-size.pipe';
import { catchError, concatAll, from, of, switchMap, takeWhile, tap, throwError, timer } from 'rxjs';
import { FileUploadFrontendService } from '@studiz/frontend/file-upload-frontend-service';
import FileUploadStore from './file-uploads.store';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg+xml'
];

@Component({
  selector: 'studiz-file-upload',
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    NgStyle,
    IonButton,
    IonRow,
    IonCol,
    FormsModule,
    JsonPipe,
    IonList,
    IonItem,
    IonLabel,
    FileSizePipe,
    IonButtons,
    IonInput,
    IonProgressBar,
    IonAvatar,
    IonImg,
    IonSkeletonText,
    PercentPipe
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FileUploadStore]
})
export class FileUploadComponent implements ControlValueAccessor {
  uploadedFilesStore = inject(FileUploadStore);
  fileUploadsWithIcons = this.uploadedFilesStore.fileUploadsWithIcons


  ionInput = viewChild.required(IonInput);
  fileIcons: Record<string, string> = {
    'default': 'file',
    'image/jpeg': 'file-jpg-downloaded',
    'image/png': 'file-png-downloaded',
    'image/svg': 'file-svg-downloaded'
  };
  backendUrl = inject(BACKEND_URL);
  @Self() @Optional() ngControl = inject(NgControl);
  onChanges?: (param: { id: number }[] | { id: number }) => void;
  onTouched?: () => void;
  disabled = signal(false);
  alertCtrl = inject(AlertController);
  fileUploadInfo = signal<IFileUploadModel[]>([]);
  fileUploadInfoWithIcons = computed(() => {
      return this.fileUploadInfo().map((file) => ({
        ...file,
        icon: this.fileIcons[file.mimetype as string] ? this.fileIcons[file.mimetype as string] : this.fileIcons['default']
      }));
    }
  );
  selectedFiles: File[] | null = null;
  multiple = input(false);
  fileUrls = signal<string[]>([]);
  uploadFiles = signal<File[]>([]);
  currentUploadingFile = signal<File | null>(null);
  currentUploadingFileUrl = computed(() => {
    const currentUploadingFile = this.currentUploadingFile();
    return currentUploadingFile ? URL.createObjectURL(currentUploadingFile) : null;
  });
  currentUploadingFileUrlIcon = computed(() => {
    return this.fileIcons[this.currentUploadingFile()?.type as string] ? this.fileIcons[this.currentUploadingFile()?.type as string] : this.fileIcons['default'];
  });
  isUploading = signal<boolean[]>([]);
  isUploadingCompleted = computed(() => this.isUploading().every((uploading) => !uploading));
  allowedFileTypes = ALLOWED_FILE_TYPES;
  fileOverDragZone = signal(false);
  uploadProgress = signal(0);
  fileUploadService = inject(FileUploadFrontendService);

  writeValue(obj: { id: number }[]): void {
    untracked(() => {
      this.fetchImageObjects(obj);
    });
  }

  fetchImageObjects(imageIds?: { id: number }[]): void {
    if (imageIds?.[0]?.id) {
      this.fileUrls.set(
        imageIds.map(item => `${this.backendUrl}/images/${item.id}`)
      );

      this.fileUploadService.getItems({
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
            this.fileUploadInfo.set([...result.items] as IFileUploadModel[]);
          }
        }
      });

    }

  }

  registerOnChange(fn: (param: { id: number }[] | { id: number }) => void): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  handleChange(event: any) {
    this.onTouched?.();
    const files = event.target.files as FileList;
    // this.selectedFiles = Array.from(files) as File[];
    this.uploadedFilesStore.addFiles(files);
    event.target.value = null;



    // this.fileUrls.update((fileUrls) => [
    //     ...fileUrls,
    //     ...this.selectedFiles?.map((selectedFile) => URL.createObjectURL(selectedFile)) ?? []
    //   ]
    // );
    //
    // this.uploadFiles.set(
    //   [...this.uploadFiles(), ...this.selectedFiles]
    // );
    //
    // this.handleUploadFile();
  }


  handleUploadFile() {

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.isUploading.set(Array(this.selectedFiles.length).fill(true));
      let currentUploadProgress = 0;
      from(this.selectedFiles.map(file => {
          return of(true).pipe(
            tap(() => {
              this.currentUploadingFile.set(file);
              this.uploadProgress.set(0);
              timer(100, 100).pipe(
                takeWhile(() => this.uploadProgress() < 100)
              ).subscribe({
                next: () => {
                  this.uploadProgress.update((progress) => Math.round(Math.min(progress + ((100 - progress) / 10), 99)));
                }
              });
            }),
            switchMap(() => this.fileUploadService.uploadFile(file).pipe(
              tap(() => {
                this.uploadProgress.set(100);
              }),
              catchError((res) => {

                console.log({ file });
                // this.fileUploadInfo.update(fileUploads => {
                //   fileUploads.push(fileUpload);
                //   return [...fileUploads];
                // });

                return throwError(() => res);
              })
            ))
          );
        }
      )).pipe(
        concatAll()
      ).subscribe({
        next: (response) => {
          console.log(response);
          const fileUpload = response.data?.uploadSingleFile.data as IFileUploadModel;
          this.fileUploadInfo.update(fileUploads => {
            fileUploads.push(fileUpload);
            return [...fileUploads];
          });
          this.onChanges?.(this.fileUploadInfo());
          this.isUploading.update(uploading => {
            uploading[currentUploadProgress] = false;
            currentUploadProgress++;
            return [...uploading];
          });
        }
      });
    }
  }

  async handleRemovesFile($index: number) {
    const alertDialog = await this.alertCtrl.create({
      header: 'Remove file',
      message: `Are you sure you want to remove this image?`,
      cssClass: 'alert alert-danger',
      buttons: [
        'Cancel',
        { role: 'destructive', text: 'Yes Remove' }
      ]
    });

    await alertDialog.present();
    const { role } = await alertDialog.onWillDismiss();
    if (role === 'destructive') {
      this.selectedFiles?.splice($index, 1);
      this.fileUrls.update(fileUrls => {
        fileUrls.splice($index, 1);
        return [...fileUrls];
      });
      this.fileUploadInfo.update(uploadFiles => {
        uploadFiles.splice($index, 1);
        return [...uploadFiles];
      });
      this.onTouched?.();
      this.onChanges?.([...this.fileUploadInfo()]);
    }
  }

  async triggerUpload() {
    const inputElement = await this.ionInput().getInputElement();
    inputElement.click();

  }

  fileDropped($event: any) {
    this.onTouched?.();
    $event.preventDefault();
    $event.stopPropagation();
    const files = $event.dataTransfer.files as FileList;
    this.selectedFiles = Array.from(files) as File[];

    this.fileUrls.update((fileUrls) => [
        ...fileUrls,
        ...this.selectedFiles?.map((selectedFile) => URL.createObjectURL(selectedFile)) ?? []
      ]
    );

    this.uploadFiles.set(
      [...this.uploadFiles(), ...this.selectedFiles]
    );

    this.handleUploadFile();
  }
}
