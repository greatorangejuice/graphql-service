import { Injectable } from '@nestjs/common';
import { FavoriteInput } from './dto/favorite.input';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IFavoriteType, RemovedItem } from '../../utils/helper-models';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.FAVOURITES_URL,
    });
  }

  async create(createFavoriteInput: FavoriteInput, type: IFavoriteType) {
    const response: AxiosResponse<Favorite> = await this.client.put(
      '/add',
      { ...createFavoriteInput, type },
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findAll() {
    const response: AxiosResponse = await this.client.get('', {
      headers: { Authorization: process.env.AUTH_TOKEN },
    });
    return response.data;
  }

  async remove(removeFavoriteInput: FavoriteInput, type) {
    const response: AxiosResponse<RemovedItem> = await this.client.put(
      '/remove',
      { ...removeFavoriteInput, type },
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }
}
