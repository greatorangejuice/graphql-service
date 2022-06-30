import { Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IResponse, RemovedItem } from '../../utils/helper-models';
import { Album } from './entities/album.entity';
import { GenresService } from '../genres/genres.service';
import { BandsService } from '../bands/bands.service';

@Injectable()
export class AlbumService {
  private client: AxiosInstance;
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJiMDhkYmZlYjdlNTUzMzhiYzEwYWEiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjdAZ21haWwuY29tIiwiaWF0IjoxNjU2NTA1NDA0fQ.2gMm6Kx63SWS7U-mFNHUx-kk_2Ezt2OJeybKPn2g0Ac';

  constructor(
    private genresService: GenresService,
    private bandsService: BandsService,
  ) {
    this.client = axios.create({
      baseURL: process.env.ALBUMS_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async create(createAlbumInput: CreateAlbumInput) {
    const response: AxiosResponse<Album> = await this.client.post(
      '',
      createAlbumInput,
    );
    return response.data;
  }

  async findAll() {
    // const response: AxiosResponse<IResponse<Album>> = await this.client.get('', {
    //   params: {
    //     offset: paginationInput.offset,
    //     limit: paginationInput.limit,
    //   },
    // });
    const response: AxiosResponse<IResponse<Album>> = await this.client.get('');
    return response.data.items;
  }

  async findOne(id: string) {
    const album: AxiosResponse<any> = await this.client.get(id);
    const idB = album.data.bandsIds[0];
    console.log(idB);
    const band = await this.bandsService.findOne(idB);
    console.log(band);
    const album2 = new Album();
    album2._id = album.data._id;
    album2.name = album.data.name;
    album2.bands = [band];
    return album2;
  }

  async update(id: string, updateAlbumInput: UpdateAlbumInput) {
    const response: AxiosResponse<Album> = await this.client.put(
      id,
      updateAlbumInput,
    );
    return response.data;
  }

  async remove(id: string) {
    const response: AxiosResponse<RemovedItem> = await this.client.delete(id);
    return response.data;
  }
}
