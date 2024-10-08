import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
  IonSkeletonText, IonSpinner,
  IonText
} from '@ionic/angular/standalone';
import { DecimalPipe, JsonPipe, NgStyle, PercentPipe } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FileSizePipe } from './file-size.pipe';
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
    PercentPipe,
    DecimalPipe,
    IonSpinner
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FileUploadStore]
})
export class FileUploadComponent implements ControlValueAccessor {
  label = input('')
  uploadedFilesStore = inject(FileUploadStore);
  fileUploadsWithIcons = this.uploadedFilesStore.fileUploadsWithIcons;
  isUploading = this.uploadedFilesStore.isUploading

  ionInput = viewChild.required(IonInput);

  @Self() @Optional() ngControl = inject(NgControl);
  onChanges?: (param: { id: number }[] | { id: number }) => void;
  onTouched?: () => void;
  disabled = signal(false);
  alertCtrl = inject(AlertController);
  multiple = input(false);
  multipleEffect = effect(() => {
    const multiple = this.multiple();
    untracked(() => {
      this.uploadedFilesStore.setMultiple(multiple);
    });

  });

  allowedFileTypes = ALLOWED_FILE_TYPES;
  fileOverDragZone = signal(false);

  fileUploadChangeEffect = effect(() => {
    this.uploadedFilesStore.fileUploads();
    const val = this.uploadedFilesStore.fileUploads().map(x => x.fileUpload);
    if (val) {
      this.onChanges?.(val as { id: number }[]);
    } else {
      this.onChanges?.([]);
    }
  });

  writeValue(obj: { id: number }[]): void {
    untracked(() => {
      if (obj?.[0]?.id) {
        this.uploadedFilesStore.loadImages(obj);
      }
    });
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

  async handleChange(event: any) {
    const completeAction = () => {
      const files = event.target.files as FileList;
      this.uploadedFilesStore.addFiles(files);
      event.target.value = null;
      this.triggerInputChange();
    };
    if (!this.multiple() && this.uploadedFilesStore.fileUploads().length > 0) {
      const alertDialog = await this.alertCtrl.create({
        header: 'Replace file',
        message: `This action will replace existing file, continue?`,
        cssClass: 'alert alert-danger',
        buttons: [
          'Cancel',
          { role: 'destructive', text: 'Yes Replace' }
        ]
      });

      await alertDialog.present();
      const { role } = await alertDialog.onWillDismiss();
      if (role === 'destructive') {
        completeAction();
      }
    } else {
      completeAction();
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
      this.uploadedFilesStore.removeFile($index);
      this.triggerInputChange();
    }
  }

  triggerInputChange() {
    this.onTouched?.();
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
