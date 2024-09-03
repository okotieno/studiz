import { Injectable } from '@angular/core';
import { IGetFileUploadsGQL, IUploadFileGQL, IUploadFileMutation } from './schemas/file-upload.generated';
import { SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';
import { map, Observable } from 'rxjs';
import { MutationResult } from 'apollo-angular';
import { IQueryParams } from '@studiz/shared/types/frontend';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService  {
  entity = 'file-upload';

  constructor(
    private uploadFileGQL: IUploadFileGQL,
    private getFileUploadsGQL: IGetFileUploadsGQL
  ) {
  }

  getItems(params: IQueryParams) {
    return this.getFileUploadsGQL.fetch({ query: params }).pipe(
      map((res) => res.data.fileUploads)
    )
  }

  uploadFile(file: any): Observable<MutationResult<IUploadFileMutation>> {
    return this.uploadFileGQL.mutate({ file }, {
      context: {
        useMultipart: true,
        [SHOW_SUCCESS_MESSAGE]: true
      }
    });
  }
}
