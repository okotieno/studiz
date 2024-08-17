import { InstitutionModel } from '@studiz/backend/db';

export class InstitutionDeletedEvent {
  constructor(public institution: InstitutionModel) {}
}
