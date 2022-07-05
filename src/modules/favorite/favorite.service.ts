import { Injectable } from '@nestjs/common';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Album } from '../album/entities/album.entity';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  private client: AxiosInstance;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJiMDhkYmZlYjdlNTUzMzhiYzEwYWEiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjdAZ21haWwuY29tIiwiaWF0IjoxNjU2NTA1NDA0fQ.2gMm6Kx63SWS7U-mFNHUx-kk_2Ezt2OJeybKPn2g0Ac';

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ALBUMS_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async create(createFavoriteInput: CreateFavoriteInput) {
    console.log('Fav input', createFavoriteInput);
    const response: AxiosResponse<Favorite> = await this.client.put(
      '/add',
      createFavoriteInput,
    );
    return response.data;
  }

  async findAll() {
    // const response: AxiosResponse<IResponse<Favorite>> = await this.client.get('', {
    //   params: {
    //     offset: paginationInput.offset,
    //     limit: paginationInput.limit,
    //   },
    // });
    const response: AxiosResponse<IResponse<Favorite>> = await this.client.get(
      '',
    );
    console.log(response.data.items);
    return response.data.items;
  }

  async remove(createFavoriteInput: CreateFavoriteInput) {
    const response: AxiosResponse<RemovedItem> = await this.client.put(
      'remove',
      CreateFavoriteInput,
    );
    return response.data;
  }
}
