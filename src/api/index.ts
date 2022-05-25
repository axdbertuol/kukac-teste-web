import { AxiosResponse } from 'axios';
import { Carro, Moto } from '../types/veiculos';
import axiosInstance from './axiosInstance'
import axios from "axios";
import { Palindromo, Change, GetChangeResponse, GetCepInfoResponse } from '../types/api';
import { CepsBody } from '../App';


export const registerVehicle = async (veiculo: Carro | Moto) => {
  try {
    const response = await axiosInstance.post("/registerVehicle", { veiculo });
    console.log("reg", response)

  } catch (error) {
    console.error("registerVehicle", error);
  }
};
export const getPalindromes = async ({ first, last }: Palindromo) => {
  try {
    const response: AxiosResponse<number[]> =
      await axiosInstance.post("palindromes", { first, last });
    return response.data;
  } catch (error) {
    console.error("getPalindromes", error);
  }
};
export const getChange = async ({ total, given }: Change) => {
  try {
    const response: AxiosResponse<GetChangeResponse> =
      await axiosInstance.post("getChange", { total, given });
    return response.data;
  } catch (error) {
    console.error("getPalindromes", error);
  }
};
export const getCepInfo = ({ cep }: { cep: string }) => {
  return axios.get(`http://viacep.com.br/ws/${cep}/json`)
    .then((r: AxiosResponse<GetCepInfoResponse>) => r.data);
}
export const getCepsInfo = async (ceps: CepsBody) => {
  try {
    const response: AxiosResponse<GetCepInfoResponse[]> =
      await axiosInstance.post(`/getSyncedCeps`, ceps)
    return response.data;
  } catch (error) {
    console.error("getCepsInfo", error);
  }
}
