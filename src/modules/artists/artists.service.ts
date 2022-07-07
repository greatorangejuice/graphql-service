import { Injectable } from '@nestjs/common';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import axios, { AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ARTISTS_URL,
    });
  }

  async create(createArtistInput: CreateArtistInput): Promise<Artist> {
    const response: AxiosResponse<Artist> = await this.client.post(
      '',
      createArtistInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findAll(paginationInput): Promise<Array<Artist>> {
    const response: AxiosResponse<IResponse<Artist>> = await this.client.get(
      '',
      {
        params: {
          offset: paginationInput.offset,
          limit: paginationInput.limit,
        },
      },
    );
    return response.data.items;
  }

  async findOne(id: string) {
    const response: AxiosResponse<Artist> = await this.client.get(id);
    return response.data;
  }

  async update(id: string, updateArtistInput: UpdateArtistInput) {
    const response: AxiosResponse<Artist> = await this.client.put(
      id,
      updateArtistInput,
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
