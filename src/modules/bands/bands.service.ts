import { Injectable } from '@nestjs/common';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import axios from 'axios';

@Injectable()
export class BandsService {
  private client;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJiMDhkYmZlYjdlNTUzMzhiYzEwYWEiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjdAZ21haWwuY29tIiwiaWF0IjoxNjU2NTA1NDA0fQ.2gMm6Kx63SWS7U-mFNHUx-kk_2Ezt2OJeybKPn2g0Ac';

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ARTISTS_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async create(createBandInput: CreateBandInput) {
    return 'This action adds a new band';
  }

  async findAll() {
    return `This action returns all bands`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} band`;
  }

  async update(id: number, updateBandInput: UpdateBandInput) {
    return `This action updates a #${id} band`;
  }

  async remove(id: string) {
    return `This action removes a #${id} band`;
  }
}
