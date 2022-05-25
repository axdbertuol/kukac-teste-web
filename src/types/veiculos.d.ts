
export interface Veiculo {
  modelo?: string
  fabricacao?: number
  qtdPortas?: number
  marca?: string
}

export type QtdPortasCarro = 2 | 4;

export type Carro = Veiculo & {
  qtdPortas?: QtdPortasCarro
}

export type Moto = Veiculo | {
  rodas?: number,
  passageiros?: number
}