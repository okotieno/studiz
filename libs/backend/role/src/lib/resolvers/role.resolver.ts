import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleBackendService } from '@studiz/backend/role-service';
import { CreateRoleInputDto } from '../dto/create-role-input.dto';
import {
  BadRequestException,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RoleCreatedEvent } from '../events/role-created.event';
import { JwtAuthGuard } from '@studiz/backend/auth';
import {
  PermissionGuard,
  Permissions,
  PermissionsEnum,
} from '@studiz/backend/permission-service';
import { IQueryParam, RoleModel } from '@studiz/backend/db';
import { UpdateRoleInputDto } from '../dto/update-role-input.dto';
import { RoleUpdatedEvent } from '../events/role-updated.event';
import { DeleteRoleInputDto } from '../dto/delete-role-input.dto';
import { RoleDeletedEvent } from '../events/role-deleted.event';

@Resolver()
export class RoleResolver {
  constructor(
    private roleService: RoleBackendService,
    private eventEmitter: EventEmitter2
  ) {}

  @Query(() => RoleModel)
  roles(@Args('query') query: IQueryParam) {
    return this.roleService.findAll({
      ...query,
      filters: query?.filters ?? [],
    });
  }

  @Query(() => RoleModel)
  async role(@Args('id') id: number) {
    return this.roleService.findById(id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.CreateRole)
  async createRole(@Body(new ValidationPipe()) params: CreateRoleInputDto) {
    const role = await this.roleService.create({
      ...params,
    });

    this.eventEmitter.emit('role.created', new RoleCreatedEvent(role));

    return {
      message: 'Successfully created role',
      data: role,
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.UpdateRole)
  async updateRole(@Body(new ValidationPipe()) params: UpdateRoleInputDto) {
    const role = await this.roleService.findById(params.id);
    if (role) {
      await role?.update(params.params);
      await role?.save();

      this.eventEmitter.emit('role.updated', new RoleUpdatedEvent(role));
      return {
        message: 'Successfully created role',
        data: role,
      };
    }
    throw new BadRequestException('No role found');
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.DeleteRole)
  async deleteRole(@Body(new ValidationPipe()) { id }: DeleteRoleInputDto) {
    const role = (await this.roleService.findById(id)) as RoleModel;

    await role.destroy();
    this.eventEmitter.emit('role.deleted', new RoleDeletedEvent(role));

    return {
      message: 'Successfully deleted role',
      data: role,
    };
  }
}
