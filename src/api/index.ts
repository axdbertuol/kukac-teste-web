import { AxiosResponse } from 'axios';
import { Carro, Moto } from '../types/veiculos';
import axiosInstance from './axiosInstance'
export type Palindromo = {
  first: number | undefined,
  last: number | undefined
}
export const registerVehicle = async (veiculo: Carro | Moto) => {
  try {
    await axiosInstance.post("/registerVehicle", { veiculo });
  } catch (error) {
    console.error("registerVehicle", error);
  }
};
export const getPalindromes = async ({ first, last }: Palindromo) => {
  try {
    const response: AxiosResponse<number[]> = await axiosInstance.post("palindromes", { first, last });
    console.log("Palindromo", response)
    return response.data;
  } catch (error) {
    console.error("getPalindromes", error);
  }
};