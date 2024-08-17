import { InstitutionRequestModel } from '@studiz/backend/db';

export class InstitutionRequestUpdatedEvent {
  constructor(public institutionRequest: InstitutionRequestModel) {}
}
