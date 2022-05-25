import { AxiosResponse } from 'axios'
import { ChangeEvent, useState } from 'react'
import { Change, getCepInfo, GetCepInfoResponse, getChange, GetChangeResponse, getPalindromes, Palindromo, registerVehicle } from './api'
import { Carro, Moto, Veiculo } from './types/veiculos'

type Notas = {
  dez?: number, cem?: number, um?: number, troco?: number,
}

const defaultVeiculo: Veiculo = {
  fabricacao: undefined,
  marca: undefined,
  modelo: undefined,
  qtdPortas: undefined,
}

type CepInfo = {
  [key: string]: string
}
const defaultCeps = {
  "cep1": "",
  "cep2": "",
  "cep3": "",
  "cep4": "",
  "cep5": ""
}

function App() {
  const [motoChecked, setMotoChecked] = useState(false)

  const [palindromes, setPalindromes] = useState<Palindromo>({ first: undefined, last: undefined })
  const [allPalindromes, setAllPalindromes] = useState<number[] | undefined>();
  const [notas, setNotas] = useState<Notas | undefined>();
  const [trocoValues, setTrocoValues] = useState<Change>({ total: undefined, given: undefined });
  const [ceps, setCeps] = useState<typeof defaultCeps>(defaultCeps)
  const [cepsResponses, setCepsResponses] = useState<GetCepInfoResponse[] | undefined>()
  const [veiculo, setVeiculo] = useState<Carro | Moto | undefined>();

  async function handleGetPalindromes() {
    const data = await getPalindromes(palindromes)
    setAllPalindromes(data);
  }
  async function handleGetChange() {
    const data = await getChange(trocoValues)
    let notas: Notas = {
      dez: data?.result?.filter((r) => r === 10).length ?? 0,
      cem: data?.result?.filter((r) => r === 100).length ?? 0,
      um: data?.result?.filter((r) => r === 1).length ?? 0,
      troco: data?.finalChange
    }
    setNotas(notas)
  }

  async function handleRegisterVeiculo() {
    await registerVehicle(motoChecked ? veiculo as Moto : veiculo as Carro);
  }

  async function handleCepsCallback() {
    let promises = Object.entries(ceps)
      .filter(([key, value]) => value !== "" && value.length === 8)
      .map(([key, value]) => async () => getCepInfo({ cep: value }))
    let result = Promise.resolve()
    const viaCepsResponses: GetCepInfoResponse[] = []
    promises.forEach(function (promise) {
      result = result.then(promise)
        .then((res) => {
          viaCepsResponses.push(res)
          return Promise.resolve()
        })
    })

    await result
    console.log("cep", viaCepsResponses)
    setCepsResponses(viaCepsResponses)
    document.getElementById("cepResponse")?.scrollIntoView()
  }

  return (
    <div className="bg-neutral-100 min-h-screen w-full">
      <header className="w-full   h-[10vh]   rounded-b-md">
        <div className="flex h-full items-center justify-center">
          <h1>Kukac Teste</h1>
        </div>
      </header>
      <main className={`w-full md:w-2/3 lg:w-1/2 min-h-[80vh] mx-auto my-2 bg-neutral-100 ${cepsResponses && 'opacity-75'}`}>
        <div className="flex flex-col items-center divide-y-2 space-y-5 ">
          <div className="flex flex-col gap-4 items-center">
            <p className='p-4'>1- Números palíndromos são aqueles que escritos da direita para esquerda ou da esquerda para
              direita tem o mesmo valor. Exemplo: 929, 44, 97379.
              Fazer um algoritmo que imprima todos os números palíndromos entre um intervalo que será
              escolhido pelo usuário da aplicação.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex  items-center justify-center gap-2">
                <input type="number"
                  className="w-24 h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="De"
                  onChange={(e) => setPalindromes({ ...palindromes, first: parseInt(e.target.value) })}
                />
                <input type="number"
                  className="w-24 h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Até"
                  onChange={(e) => setPalindromes({ ...palindromes, last: parseInt(e.target.value) })}
                />
              </div>
              <button
                className="p-2  bg-yellow-400 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-500"
                type="button"
                onClick={handleGetPalindromes}
                disabled={!palindromes || !palindromes?.first || !palindromes.last}
              >
                Buscar palindromos
              </button>
            </div>
            <div className={`flex flex-col items-center max-w-screen-sm px-5 py-2 bg-yellow-100 ${!allPalindromes && 'hidden'}`}>
              <p>Resultados: </p>
              <>{allPalindromes?.map((pal) => pal + ", ")}</>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="p-4">2- Suponha que um caixa disponha apenas de notas de 1, 10 e 100 reais. Considerando que
              alguém está pagando uma compra, escreva um algoritmo que mostre o número mínimo de
              notas que o caixa deve fornecer como troco.
              Mostre também: o valor da compra, o valor do troco e a quantidade de cada tipo de nota do
              troco. Suponha que o sistema monetário não utilize moedas.
              O valor da compra e o valor de dinheiro entregue ao caixa deve ser informado pelo usuário.
            </p>
            <div className="flex flex-col gap-2 mt-1 ">
              <div className="flex flex-col items-center justify-center gap-2">
                <input type="number"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Valor total da compra"
                  onChange={(e) => setTrocoValues({ ...trocoValues, total: parseInt(e.target.value) })}
                />
                <input type="number"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Valor pago"
                  onChange={(e) => setTrocoValues({ ...trocoValues, given: parseInt(e.target.value) })}
                />
              </div>
              <button
                className="p-2 bg-yellow-400 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-500"
                type="button"
                onClick={handleGetChange}
                disabled={!trocoValues || !trocoValues?.total || !trocoValues.given}
              >
                Buscar troco
              </button>
            </div>
            <div className={`flex flex-col items-center max-w-screen-sm px-5 py-2 bg-yellow-100 ${!notas && 'hidden'}`}>
              <p>Resultados: </p>
              <ul>
                <li>Troco: {notas?.troco} </li>
                <li>Notas de 100: {notas?.cem} </li>
                <li>Notas de 10: {notas?.dez} </li>
                <li>Notas de 1: {notas?.um} </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="p-4">3- Deve ser solicitado ao usuário que preencha as informações sobre o seu veículo, os dados devem ser
              salvos em um arquivo JSON (para não precisar trabalhar com banco de dados, até porquê já vai ser
              bem próximo de um banco NoSQL);
            </p>
            <div className="flex flex-col gap-2 mt-1 ">
              <div className="flex flex-col items-center justify-center gap-2">
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Modelo"
                  onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
                />
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Marca"
                  onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
                />
                <input type="number"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Quantidade de Portas"
                  onChange={(e) => setVeiculo({ ...veiculo, qtdPortas: parseInt(e.target.value) } as Carro)}
                  disabled={motoChecked}
                />
                <input type="number"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Ano de fabricação"
                  onChange={(e) => setVeiculo({ ...veiculo, fabricacao: parseInt(e.target.value) })}
                />
                <div className="flex items-center w-full justify-around">
                  <label htmlFor="motoCheck">Moto</label>
                  <input type="checkbox" name='moto' id="motoCheck"
                    className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                    onChange={() => setMotoChecked(!motoChecked)}
                  />
                </div>
                <div className={`flex flex-col gap-2 transition-all ${!motoChecked && 'hidden '}`}>
                  <input type="number"
                    className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                    placeholder="Rodas"
                    onChange={(e) => setVeiculo({ ...veiculo, rodas: parseInt(e.target.value) } as Moto)}
                  />
                  <input type="number"
                    className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                    placeholder="Passageiros"
                    onChange={(e) => setVeiculo({ ...veiculo, passageiros: parseInt(e.target.value) } as Moto)}
                  />
                </div>
              </div>
              <button
                className="p-2 bg-yellow-400  rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-500"
                type="button"
                onClick={handleRegisterVeiculo}
                disabled={!veiculo}
              >
                Registrar Veículo
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="p-4">4- Deve ser informado pelo usuário 5 CEP’s, a aplicação deve consumir a api VIACep
              (https://viacep.com.br/) e obtiver dados sobre esses CEP’s.
              Os CEP’s informados pelo usuário devem ser inicialmente armazenados em um array, e o
              consumo da API deve ser de forma síncrona (aguardar a resposta do primeiro para iniciar a
              requisição do segundo e assim por diante).
              Os dados após o processamento devem ser exibidos na tela.
            </p>
            <div className="flex flex-col gap-2 mt-1 ">
              <div className="flex flex-col items-center justify-center gap-2">
                {
                  Object.entries(ceps).map(([k, _v], index) =>
                    <input type="text"
                      className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                      placeholder={"CEP " + (index + 1)}
                      key={k}
                      onChange={(e) => setCeps({ ...ceps, [k]: e.target.value })}
                      maxLength={8}
                    />
                  )
                }
              </div>
              <button
                className="p-2 bg-yellow-400 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-500"
                type="button"
                onClick={handleCepsCallback}
                disabled={!ceps || !ceps.cep1 || !ceps.cep2 || !ceps.cep3 || !ceps.cep4 || !ceps.cep5}
              >
                Buscar Ceps
              </button>

            </div>
          </div>
        </div>
      </main >
      <footer className="w-full mt-5  h-[8vh] mx-auto bg-yellow-300 to-neutral-100 ">
      </footer>
      <div
        id="cepResponse"
        className={`fixed top-[10vh]  py-10 left-[10vw] w-full  md:w-4/5 border rounded h-1/2 md:overflow-scroll bg-gray-300 z-10  ${!cepsResponses && 'hidden'}`}>
        <span className="fixed top-[12vh] right-[12vw] text-center cursor-pointer text-red-700 " onClick={() => setCepsResponses(undefined)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
        {
          cepsResponses?.map((cepResponse) => {

            return (
              <div className="w-full px-10 py-5 md:w-3/4 md:px-0 mx-auto divide-yellow-200">
                <ul className="list-none divide-y-2 ">
                  {
                    Object.entries(cepResponse).map(([key, value]) =>
                      <li className="list-item" key={key}>{key.toUpperCase()} - {value}</li>
                    )
                  }
                </ul>
                <hr />
              </div>
            )
          })
        }
      </div>
    </div >
  )
}

export default App


