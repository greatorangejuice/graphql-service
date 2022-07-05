import { Injectable } from '@nestjs/common';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import axios, { AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  private client;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJiMDhkYmZlYjdlNTUzMzhiYzEwYWEiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjdAZ21haWwuY29tIiwiaWF0IjoxNjU2NTA1NDA0fQ.2gMm6Kx63SWS7U-mFNHUx-kk_2Ezt2OJeybKPn2g0Ac';

  constructor() {
    this.client = axios.create({
      baseURL: process.env.GENRES_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async create(createGenreInput: CreateGenreInput) {
    const response: AxiosResponse<Genre> = await this.client.post(
      '',
      createGenreInput,
    );
    return response.data;
  }

  async findAll() {
    // const response: AxiosResponse<IResponse<Genre>> = await this.client.get('', {
    //   params: {
    //     offset: paginationInput.offset,
    //     limit: paginationInput.limit,
    //   },
    // });
    const response: AxiosResponse<IResponse<Genre>> = await this.client.get();
    return response.data.items;
  }

  async findOne(id: string) {
    const response: AxiosResponse<Genre> = await this.client.get(id);
    return response.data;
  }

  async update(id: string, updateGenreInput: UpdateGenreInput) {
    const response: AxiosResponse<Genre> = await this.client.put(
      id,
      updateGenreInput,
    );
    return response.data;
  }

  async remove(id: string) {
    const response: AxiosResponse<RemovedItem> = await this.client.delete(id);
    return response.data;
  }

  async findByIDs(ids: [string]) {
    const promises = [];
    ids.forEach((id) => {
      promises.push(this.findOne(id));
    });
    return await Promise.all(promises);
  }
}
