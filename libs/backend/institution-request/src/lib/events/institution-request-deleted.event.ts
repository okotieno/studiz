import { InstitutionRequestModel } from '@studiz/backend/db';

export class InstitutionRequestDeletedEvent {
  constructor(public institutionRequest: InstitutionRequestModel) {}
}
