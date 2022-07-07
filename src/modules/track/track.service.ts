import { Injectable } from '@nestjs/common';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.TRACKS_URL,
      // headers: { Authorization: process.env.AUTH_TOKEN },
    });
  }

  async create(createTrackInput: CreateTrackInput) {
    const response: AxiosResponse<Track> = await this.client.post(
      '',
      createTrackInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
    );
    return response.data;
  }

  async findAll(paginationInput) {
    const response: AxiosResponse<IResponse<Track>> = await this.client.get(
      '',
      {
        params: {
          offset: paginationInput.offset,
          limit: paginationInput.limit,
        },
      },
    );
    // const response: AxiosResponse<IResponse<Track>> = await this.client.get('');
    return response.data.items;
  }

  async findOne(id: string) {
    const album: AxiosResponse<any> = await this.client.get(id);
    return album.data;
  }

  async update(id: string, updateTrackInput: UpdateTrackInput) {
    const response: AxiosResponse<Track> = await this.client.put(
      id,
      updateTrackInput,
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
