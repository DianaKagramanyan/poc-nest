import { Body, Controller, Get, Param, Patch, Post, Delete, Query, Session } from "@nestjs/common";
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
  @Get("email")
  async getUserByEmail(@Query("email") email: string): Promise<User> {
    console.log(email);
    return this.usersService.getUserByEmail(email);
  }

  @Get("/whoami")
  whoAmI(@Session() session: any) {
    return this.usersService.getUserById(session.userId);
  }

  @Post("/signout")
  signOut(@Session() session: any) {
    session.userId = null;
  }
  @Post("/signup")
  async createUser(@Body() createUserDto: CreateUserDto, @Session() session: any): Promise<User> {
    // return this.usersService.createUser(createUserDto.email, createUserDto.password);
    const user = await this.authService.signup(createUserDto.email, createUserDto.password);
    session.userId = user.userId;
    return user;
  }

  @Post("/signin")
  async signin(@Body() createUserDto: CreateUserDto, @Session() session: any): Promise<User> {
    const user = await this.authService.signin(createUserDto.email, createUserDto.password);
    session.userId = user.userId;
    return user;
  }

  @Get(":userId")
  async getUser(@Param("userId") userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
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
