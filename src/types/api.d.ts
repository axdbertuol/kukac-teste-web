export type Palindromo = {
  first: number | undefined
  last: number | undefined
}

export type Change = {
  total: number | undefined
  given: number | undefined
}

export type GetChangeResponse = {
  total: number | undefined,
  finalChange: number | undefined,
  result: number[] | undefined
}

export type GetCepInfoResponse = {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: number,
  gia: number,
  ddd: number,
  siafi: number,
  error?: string | number
}