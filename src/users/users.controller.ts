import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { AuthService } from "./auth.service";

@Controller("users")
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private authService: AuthService
  ) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // return this.usersService.createUser(createUserDto.email, createUserDto.password);
    return this.authService.signup(createUserDto.email, createUserDto.password);
  }
  @Post('/signin')
  signin(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.authService.signin(createUserDto.email, createUserDto.password);
  }

  // @Get(":userId")
  // async getUser(@Param("userId") userId: string): Promise<User> {
  //   return this.usersService.getUserById(userId);
  // }
  @Get("email")
  async getUserByEmail(@Query("email") email: string): Promise<User> {
    console.log(email);
    return this.usersService.getUserByEmail(email);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
  @Patch(":userId")
  async updateUser(@Param("userId") userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(":userId")
  async removeUser(@Param("userId") userId: string): Promise<User> {
    return this.usersService.removeUser(userId);
  }
}
