import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserBackendService } from '@studiz/backend/user-service';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import {
  BadRequestException,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';
import { JwtAuthGuard } from '@studiz/backend/auth';
import {
  PermissionGuard,
  Permissions,
  PermissionsEnum,
} from '@studiz/backend/permission-service';
import { IQueryParam, UserModel } from '@studiz/backend/db';
import { UpdateUserInputDto } from '../dto/update-user-input.dto';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { DeleteUserInputDto } from '../dto/delete-user-input.dto';
import { UserDeletedEvent } from '../events/user-deleted.event';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserBackendService,
    private eventEmitter: EventEmitter2
  ) {}

  @Query(() => UserModel)
  users(@Args('query') query: IQueryParam) {
    return this.userService.findAll({
      ...query,
      filters: query?.filters ?? [],
    });
  }

  @Query(() => UserModel)
  async user(@Args('id') id: number) {
    return this.userService.findById(id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.CreateUser)
  async createUser(@Body(new ValidationPipe()) params: CreateUserInputDto) {
    const user = await this.userService.create({
      ...params,
    });

    this.eventEmitter.emit('user.created', new UserCreatedEvent(user));

    return {
      message: 'Successfully created user',
      data: user,
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.UpdateUser)
  async updateUser(@Body(new ValidationPipe()) params: UpdateUserInputDto) {
    const user = await this.userService.findById(params.id);
    if (user) {
      await user?.update(params.params);
      await user?.save();

      this.eventEmitter.emit('user.updated', new UserUpdatedEvent(user));
      return {
        message: 'Successfully created user',
        data: user,
      };
    }
    throw new BadRequestException('No user found');
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(PermissionsEnum.DeleteUser)
  async deleteUser(@Body(new ValidationPipe()) { id }: DeleteUserInputDto) {
    const user = (await this.userService.findById(id)) as UserModel;

    await user.destroy();
    this.eventEmitter.emit('user.deleted', new UserDeletedEvent(user));

    return {
      message: 'Successfully deleted user',
      data: user,
    };
  }
}
