import { useState } from 'react'
import { getPalindromes, Palindromo } from './api'
import logo from './logo.svg'



function App() {
  const [motoChecked, setMotoChecked] = useState(false)

  const [palindromes, setPalindromes] = useState<Palindromo>({ first: undefined, last: undefined })
  const [allPalindromes, setAllPalindromes] = useState<number[] | undefined>();
  async function handleGetPalindromes() {
    const data = await getPalindromes(palindromes)
    setAllPalindromes(data);
  }
  return (
    <div className="bg-neutral-100 min-h-screen w-full">
      <header className="w-full   h-[10vh]   rounded-b-md">
        <div className="flex h-full items-center justify-center">
          <h1>Kukac Teste</h1>
        </div>
      </header>
      <main className="w-full md:w-2/3 min-h-[80vh] mx-auto my-2 bg-neutral-100">
        <div className="flex flex-col items-center divide-y-2 space-y-5 ">
          <div className="flex flex-col gap-4 items-center">
            <p>1- Números palíndromos são aqueles que escritos da direita para esquerda ou da esquerda para
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
            <p className="">2- Suponha que um caixa disponha apenas de notas de 1, 10 e 100 reais. Considerando que
              alguém está pagando uma compra, escreva um algoritmo que mostre o número mínimo de
              notas que o caixa deve fornecer como troco.
              Mostre também: o valor da compra, o valor do troco e a quantidade de cada tipo de nota do
              troco. Suponha que o sistema monetário não utilize moedas.
              O valor da compra e o valor de dinheiro entregue ao caixa deve ser informado pelo usuário.
            </p>
            <div className="flex flex-col gap-2 mt-1 ">
              <div className="flex flex-col items-center justify-center gap-2">
                <input type="number" className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500" placeholder="Valor total da compra" />
                <input type="number" className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500" placeholder="Valor pago" />
              </div>
              <button
                className="p-2 bg-yellow-400 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-500"
                type="button">
                Buscar troco
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="">3- Deve ser solicitado ao usuário que preencha as informações sobre o seu veículo, os dados devem ser
              salvos em um arquivo JSON (para não precisar trabalhar com banco de dados, até porquê já vai ser
              bem próximo de um banco NoSQL);
            </p>
            <div className="flex flex-col gap-2 mt-1 ">
              <div className="flex flex-col items-center justify-center gap-2">
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Modelo"
                />
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Marca"
                />
                <input type="number"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Quantidade de Portas"
                />
                <input type="number"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="Ano de fabricação"
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
                  />
                  <input type="number"
                    className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                    placeholder="Passageiros"
                  />
                </div>
              </div>
              <button
                className="p-2 bg-yellow-400 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-500"
                type="button">
                Registrar Veículo
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="">3- Deve ser solicitado ao usuário que preencha as informações sobre o seu veículo, os dados devem ser
              salvos em um arquivo JSON (para não precisar trabalhar com banco de dados, até porquê já vai ser
              bem próximo de um banco NoSQL);
            </p>
            <div className="flex flex-col gap-2 mt-1 ">
              <div className="flex flex-col items-center justify-center gap-2">
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="CEP 1"
                />
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="CEP 2"
                />
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="CEP 3"
                />
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="CEP 4"
                />
                <input type="text"
                  className="h-8 rounded-md pl-2 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500"
                  placeholder="CEP 5"
                />
              </div>
              <button
                className="p-2 bg-yellow-400 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-500"
                type="button">
                Buscar Ceps
              </button>
            </div>
          </div>
        </div>
      </main >
      <footer className="w-full mt-5  h-[8vh] mx-auto bg-yellow-100 ">

      </footer>

    </div >
  )
}

export default App
