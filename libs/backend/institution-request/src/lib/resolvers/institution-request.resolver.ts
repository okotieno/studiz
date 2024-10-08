import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InstitutionRequestBackendService } from '@studiz/backend/institution-request-service';
import { CreateInstitutionRequestInputDto } from '../dto/create-institution-request-input.dto';
import {
  BadRequestException,
  Body,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InstitutionRequestCreatedEvent } from '../events/institution-request-created.event';
import { JwtAuthGuard } from '@studiz/backend/auth';
import {
  PermissionGuard,
  Permissions,
  PermissionsEnum
} from '@studiz/backend/permission-service';
import { IQueryParam, InstitutionRequestModel } from '@studiz/backend/db';
import { UpdateInstitutionRequestInputDto } from '../dto/update-institution-request-input.dto';
import { InstitutionRequestUpdatedEvent } from '../events/institution-request-updated.event';
import { DeleteInstitutionRequestInputDto } from '../dto/delete-institution-request-input.dto';
import { InstitutionRequestDeletedEvent } from '../events/institution-request-deleted.event';
import { RegisterInstitutionInputDto } from '../dto/register-institution-input.dto';
import { TranslationService } from '@studiz/backend/translation';
import { CompleteInstitutionRequestInputDto } from '../dto/complete-institution-request-input.dto';
import {
  UpdateInstitutionRequestProgressInputDto
} from '../dto/update-institution-request-progress-input.dto';

@Resolver()
export class InstitutionRequestResolver {
  constructor(
    private institutionRequestService: InstitutionRequestBackendService,
    private eventEmitter: EventEmitter2,
    private translationService: TranslationService
  ) {
  }

  @Query(() => InstitutionRequestModel)
  institutionRequests(@Args('query') query: IQueryParam) {
    return this.institutionRequestService.findAll({
      ...query,
      filters: query?.filters ?? []
    });
  }

  @Query(() => InstitutionRequestModel)
  async institutionRequest(@Args('id') id: number) {
    return this.institutionRequestService.findById(id);
  }

  @Mutation()
  async registerInstitutionRequest(
    @Body('input', new ValidationPipe()) input: RegisterInstitutionInputDto
  ) {

    // Check if a pending registration exists with the same adminEmail and institutionName
    const existingRequest = await this.institutionRequestService.findPendingRequest(
      input.adminEmail,
      input.institutionName
    );

    if (existingRequest) {
      throw new BadRequestException(this.translationService.getTranslation('alert.institution.alreadyPending'));
    }

    const institutionRequest = await this.institutionRequestService.create({
      ...input
    });

    this.eventEmitter.emit(
      'institution-request.created',
      new InstitutionRequestCreatedEvent(institutionRequest)
    );

    return {
      message: this.translationService.getTranslation('alert.institution.register'),
      data: institutionRequest
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.CreateInstitutionRequest)
  async createInstitutionRequest(
    @Body(new ValidationPipe()) params: CreateInstitutionRequestInputDto
  ) {
    const institutionRequest = await this.institutionRequestService.create({
      ...params
    });

    this.eventEmitter.emit(
      'institution-request.created',
      new InstitutionRequestCreatedEvent(institutionRequest)
    );

    return {
      message: 'Successfully created institution-request',
      data: institutionRequest
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.UpdateInstitutionRequest)
  async updateInstitutionRequest(
    @Body(new ValidationPipe()) params: UpdateInstitutionRequestInputDto
  ) {
    const institutionRequest = await this.institutionRequestService.findById(
      params.id
    );
    if (institutionRequest) {
      await institutionRequest?.update(params.params);
      await institutionRequest?.save();

      this.eventEmitter.emit(
        'institutionRequest.updated',
        new InstitutionRequestUpdatedEvent(institutionRequest)
      );
      return {
        message: 'Successfully created institutionRequest',
        data: institutionRequest
      };
    }
    throw new BadRequestException('No institution-request found');
  }


  @Mutation()
  async updateInstitutionRequestProgress(
    @Body(new ValidationPipe()) input: UpdateInstitutionRequestProgressInputDto
  ) {

    const institutionRequest = await this.institutionRequestService.findById(
      input.id
    );
    if (institutionRequest) {
      institutionRequest.progressData = input.params as Required<typeof input.params>;
      // await institutionRequest?.update(input.params);
      await institutionRequest?.save();

      this.eventEmitter.emit(
        'institutionRequest.updated',
        new InstitutionRequestUpdatedEvent(institutionRequest)
      );
      return {
        message: 'Successfully created institutionRequest',
        data: institutionRequest
      };
    }
    throw new BadRequestException('No institution-request found');
  }

  @Mutation()
  // @UseGuards(JwtAuthGuard)
  async completeRequestRegistration(
    @Body('input', new ValidationPipe()) { id }: CompleteInstitutionRequestInputDto
  ) {

    const institutionRequest = (await this.institutionRequestService.findById(
      id
    )) as InstitutionRequestModel;

    institutionRequest.status = 'COMPLETED';
    await institutionRequest.save();

    this.eventEmitter.emit(
      'institution-request.completed',
      new InstitutionRequestUpdatedEvent(institutionRequest)
    );

    return {
      message: this.translationService.getTranslation('alert.institutionRequest.complete')
    };

  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.DeleteInstitutionRequest)
  async deleteInstitutionRequest(
    @Body(new ValidationPipe()) { id }: DeleteInstitutionRequestInputDto
  ) {
    const institutionRequest = (await this.institutionRequestService.findById(
      id
    )) as InstitutionRequestModel;

    await institutionRequest.destroy();
    this.eventEmitter.emit(
      'institution-request.deleted',
      new InstitutionRequestDeletedEvent(institutionRequest)
    );

    return {
      message: 'Successfully deleted institution-request',
      data: institutionRequest
    };
  }
}
