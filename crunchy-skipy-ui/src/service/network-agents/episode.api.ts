import { AxiosResponse } from 'axios';
import { ApiRoute } from '../../api';
import { EpisodeIdObject } from '../../api/contracts';
import { BaseApi } from './base.api';

export class Episode {
  private axiosInstance = BaseApi.getInstance().axiosInstance;

  public getEpisodeIdObject(identifier: string): Promise<AxiosResponse<EpisodeIdObject>> {
    return this.axiosInstance.get(ApiRoute.GetEpisodeIdObject);
  }
}

export const episodeApi = new Episode();
