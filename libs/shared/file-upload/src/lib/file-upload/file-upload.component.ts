import {
  ChangeDetectionStrategy,
  Component,
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

  backendUrl = inject(BACKEND_URL);
  @Self() @Optional() ngControl = inject(NgControl);
  onChanges?: (param: { id: number }[] | { id: number }) => void;
  onTouched?: () => void;
  disabled = signal(false);
  alertCtrl = inject(AlertController);
  fileUploadInfo = signal<IFileUploadModel[]>([]);

  multiple = input(false);
  fileUrls = signal<string[]>([]);


  allowedFileTypes = ALLOWED_FILE_TYPES;
  fileOverDragZone = signal(false);
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
    const files = event.target.files as FileList;
    this.uploadedFilesStore.addFiles(files);
    event.target.value = null;
    this.triggerInputChange();
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
      this.uploadedFilesStore.removeFile($index)
      this.triggerInputChange();
    }
  }

  triggerInputChange() {
    this.onTouched?.();
    this.onChanges?.([...this.uploadedFilesStore.fileUploadValue()]);
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
    this.uploadedFilesStore.addFiles(files);
    this.triggerInputChange();
  }
}
