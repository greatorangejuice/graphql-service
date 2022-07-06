import { Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private client: AxiosInstance;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJiMDhkYmZlYjdlNTUzMzhiYzEwYWEiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjdAZ21haWwuY29tIiwiaWF0IjoxNjU2NTA1NDA0fQ.2gMm6Kx63SWS7U-mFNHUx-kk_2Ezt2OJeybKPn2g0Ac';

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ALBUMS_URL,
    });
  }

  async create(createAlbumInput: CreateAlbumInput) {
    const response: AxiosResponse<Album> = await this.client.post(
      '',
      createAlbumInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findAll(paginationInput) {
    const response: AxiosResponse<IResponse<Album>> = await this.client.get(
      '',
      {
        params: {
          offset: paginationInput.offset,
          limit: paginationInput.limit,
        },
      },
    );
    // const response: AxiosResponse<IResponse<Album>> = await this.client.get('');
    return response.data.items;
  }

  async findOne(id: string) {
    const album: AxiosResponse<Album> = await this.client.get(id);
    return album.data;
  }

  async update(id: string, updateAlbumInput: UpdateAlbumInput) {
    const response: AxiosResponse<Album> = await this.client.put(
      id,
      updateAlbumInput,
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
