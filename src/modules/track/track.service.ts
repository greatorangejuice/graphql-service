import { Injectable } from '@nestjs/common';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private client: AxiosInstance;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJiMDhkYmZlYjdlNTUzMzhiYzEwYWEiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjdAZ21haWwuY29tIiwiaWF0IjoxNjU2NTA1NDA0fQ.2gMm6Kx63SWS7U-mFNHUx-kk_2Ezt2OJeybKPn2g0Ac';

  constructor() {
    this.client = axios.create({
      baseURL: process.env.TRACKS_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async create(createTrackInput: CreateTrackInput) {
    const response: AxiosResponse<Track> = await this.client.post(
      '',
      createTrackInput,
    );
    return response.data;
  }

  async findAll() {
    // const response: AxiosResponse<IResponse<Track>> = await this.client.get('', {
    //   params: {
    //     offset: paginationInput.offset,
    //     limit: paginationInput.limit,
    //   },
    // });
    const response: AxiosResponse<IResponse<Track>> = await this.client.get('');
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
    );
    console.log(response);
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
