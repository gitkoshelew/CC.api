import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { UserAccess } from './user.access.model';
import { AddAccessDto } from './dto/addAccessToUser.dto';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Method to get one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getPermissionById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'add access group to user' })
  @ApiResponse({ status: 200, type: UserAccess })
  @Put('/add')
  addAccessGroupToUser(@Body() dto: AddAccessDto) {
    return this.userService.addAccessToUser(dto);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
