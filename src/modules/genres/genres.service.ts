import { Injectable } from '@nestjs/common';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import axios, { AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.GENRES_URL,
    });
  }

  async create(createGenreInput: CreateGenreInput) {
    const response: AxiosResponse<Genre> = await this.client.post(
      '',
      createGenreInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findAll(paginationInput) {
    const response: AxiosResponse<IResponse<Genre>> = await this.client.get(
      '',
      {
        params: {
          offset: paginationInput.offset,
          limit: paginationInput.limit,
        },
      },
    );
    // const response: AxiosResponse<IResponse<Genre>> = await this.client.get();
    return response.data.items;
  }

  async findOne(id: string) {
    const response: AxiosResponse<Genre> = await this.client.get(id, {
      headers: { Authorization: process.env.AUTH_TOKEN },
    });
    return response.data;
  }

  async update(id: string, updateGenreInput: UpdateGenreInput) {
    const response: AxiosResponse<Genre> = await this.client.put(
      id,
      updateGenreInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async remove(id: string) {
    const response: AxiosResponse<RemovedItem> = await this.client.delete(id, {
      headers: { Authorization: process.env.AUTH_TOKEN },
    });
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
