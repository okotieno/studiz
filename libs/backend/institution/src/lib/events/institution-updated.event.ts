import { InstitutionModel } from '@studiz/backend/db';

export class InstitutionUpdatedEvent {
  constructor(public institution: InstitutionModel) {}
}
