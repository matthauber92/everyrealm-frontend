import api from '../utils/api';
import {AxiosResponse, AxiosError} from "axios";
import {Burrito} from "../models/burrito.ts";

function getBurritos(): Promise<AxiosResponse<Burrito[]>> {
  return api.get('api/burrito', {
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    }
  })
    .then((response: AxiosResponse<Burrito[]>) => response)
    .catch((error: AxiosError) => Promise.reject(error));
}

export {
  getBurritos
}