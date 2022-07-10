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

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BANDS_URL,
    });
  }

  async create(createBandInput: CreateBandInput) {
    const response: AxiosResponse<Band> = await this.client.post(
      '',
      createBandInput,
      { headers: { Authorization: process.env.AUTH_TOKEN } },
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
}
