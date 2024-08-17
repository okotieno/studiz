import { InstitutionModel } from '@studiz/backend/db';

export class InstitutionCreatedEvent {
  constructor(public institution: InstitutionModel) {}
}
