import { Body, Controller, Get, Param, Patch, Post, Delete } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";

@Controller("users")
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get(":userId")
  async getUser(@Param("userId") userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto.email, createUserDto.age);
  }

  @Patch(":userId")
  async updateUser(@Param("userId") userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(":userId")
  async removeUser(@Param("userId") userId: string): Promise<User>{
    return this.usersService.removeUser(userId);
  }

}
