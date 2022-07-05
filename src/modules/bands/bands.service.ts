import { Injectable } from '@nestjs/common';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import axios, { AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Band } from './entities/band.entity';
import { PaginationInput } from '../../utils/dto/pagination.input';

@Injectable()
export class BandsService {
  private client;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJiMDhkYmZlYjdlNTUzMzhiYzEwYWEiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjdAZ21haWwuY29tIiwiaWF0IjoxNjU2NTA1NDA0fQ.2gMm6Kx63SWS7U-mFNHUx-kk_2Ezt2OJeybKPn2g0Ac';

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BANDS_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async create(createBandInput: CreateBandInput) {
    const response: AxiosResponse<Band> = await this.client.post(
      '',
      createBandInput,
    );
    return response.data;
  }

  async findAll(paginationInput: PaginationInput = { limit: 5, offset: 0 }) {
    const response: AxiosResponse<IResponse<Band>> = await this.client.get('', {
      params: {
        offset: paginationInput.offset,
        limit: paginationInput.limit,
      },
    });
    return response.data.items;
  }

  async findOne(id: string) {
    const response: AxiosResponse<Band> = await this.client.get(id);
    return response.data;
  }

  async findByIDs(ids: [string]) {
    const promises = [];
    ids.forEach((id) => {
      promises.push(this.findOne(id));
    });
    return await Promise.all(promises);
  }

  async update(id: string, updateBandInput: UpdateBandInput) {
    const response: AxiosResponse<Band> = await this.client.put(
      id,
      updateBandInput,
    );
    return response.data;
  }

  async remove(id: string) {
    const response: AxiosResponse<RemovedItem> = await this.client.delete(id);
    return response.data;
  }
}
