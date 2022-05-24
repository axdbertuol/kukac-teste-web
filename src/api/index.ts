import { Carro, Moto } from '../types/veiculos';
import axiosInstance from './axiosInstance'

export const registerVehicle = async (veiculo: Carro | Moto) => {
  try {
    await axiosInstance.post("/registerVehicle", { veiculo });
  } catch (error) {
    console.error("fetchMessages", error);
  }
};