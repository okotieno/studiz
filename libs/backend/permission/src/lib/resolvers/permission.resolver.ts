import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionBackendService } from '@studiz/backend/permission-service';
import { CreatePermissionInputDto } from '../dto/create-permission-input.dto';
import {
  BadRequestException,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PermissionCreatedEvent } from '../events/permission-created.event';
import { JwtAuthGuard } from '@studiz/backend/auth';
import {
  PermissionGuard,
  Permissions,
  PermissionsEnum,
} from '@studiz/backend/permission-service';
import { IQueryParam, PermissionModel } from '@studiz/backend/db';
import { UpdatePermissionInputDto } from '../dto/update-permission-input.dto';
import { PermissionUpdatedEvent } from '../events/permission-updated.event';
import { DeletePermissionInputDto } from '../dto/delete-permission-input.dto';
import { PermissionDeletedEvent } from '../events/permission-deleted.event';

@Resolver()
export class PermissionResolver {
  constructor(
    private permissionService: PermissionBackendService,
    private eventEmitter: EventEmitter2
  ) {}

  @Query(() => PermissionModel)
  permissions(@Args('query') query: IQueryParam) {
    return this.permissionService.findAll({
      ...query,
      filters: query?.filters ?? [],
    });
  }

  @Query(() => PermissionModel)
  async permission(@Args('id') id: number) {
    return this.permissionService.findById(id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.CreatePermission)
  async createPermission(
    @Body(new ValidationPipe()) params: CreatePermissionInputDto
  ) {
    const permission = await this.permissionService.create({
      ...params,
    });

    this.eventEmitter.emit(
      'permission.created',
      new PermissionCreatedEvent(permission)
    );

    return {
      message: 'Successfully created permission',
      data: permission,
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.UpdatePermission)
  async updatePermission(
    @Body(new ValidationPipe()) params: UpdatePermissionInputDto
  ) {
    const permission = await this.permissionService.findById(params.id);
    if (permission) {
      await permission?.update(params.params);
      await permission?.save();

      this.eventEmitter.emit(
        'permission.updated',
        new PermissionUpdatedEvent(permission)
      );
      return {
        message: 'Successfully created permission',
        data: permission,
      };
    }
    throw new BadRequestException('No permission found');
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.DeletePermission)
  async deletePermission(
    @Body(new ValidationPipe()) { id }: DeletePermissionInputDto
  ) {
    const permission = (await this.permissionService.findById(
      id
    )) as PermissionModel;

    await permission.destroy();
    this.eventEmitter.emit(
      'permission.deleted',
      new PermissionDeletedEvent(permission)
    );

    return {
      message: 'Successfully deleted permission',
      data: permission,
    };
  }
}
