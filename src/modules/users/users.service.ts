import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import axios, { AxiosResponse } from 'axios';
import { IResponse } from '../../utils/helper-models';
import { User } from './entities/user.entity';
import { LoginInput } from './dto/login.input';

@Injectable()
export class UsersService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });
  }

  async create(createUserInput: CreateUserInput): Promise<IResponse<User>> {
    const response: AxiosResponse<IResponse<User>> = await axios.post(
      `http://localhost:3004/v1/users/register`,
      createUserInput,
    );
    return response.data;
  }

  async findOne(id: string): Promise<IResponse<User>> {
    const response: AxiosResponse<IResponse<User>> = await axios.get(
      `${process.env.USERS_URL}/${id}`,
    );
    return response.data;
  }

  async login(loginInput: LoginInput) {
    const response: AxiosResponse = await axios.post(
      `${process.env.USERS_URL}/login`,
      loginInput,
      {
        headers: { Authorization: process.env.AUTH_TOKEN },
      },
    );
    return response.data;
  }
}
