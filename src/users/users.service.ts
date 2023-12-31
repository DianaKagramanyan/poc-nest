import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  async getUserById(userId: string): Promise<User> {
    if (!userId) {
      return null;
    }
    return this.usersRepository.findOne({ userId });
  }

  async getUserByEmail(email: string): Promise<User> {
    console.log(email);
    return this.usersRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(email: string, password: string): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      password
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async removeUser(userId: string): Promise<User> {
    return this.usersRepository.findOneAndDelete({ userId });
  }
}
