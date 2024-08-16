import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';


@Resolver()

export class InstitutionResolver {
  constructor() {
  }

  @Mutation()
  async createInstitution() {
    return 'Institution Created';
  }
}
