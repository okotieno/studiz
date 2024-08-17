import { InstitutionRequestModel } from '@studiz/backend/db';

export class InstitutionRequestCreatedEvent {
  constructor(public institutionRequest: InstitutionRequestModel) {}
}
