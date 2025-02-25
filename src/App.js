import './App.css';
import { useState } from "react";

function App() {

  const [endereco, setEndereco] = useState({})
  //const [enderecos, setEnderecos] = useState([])

  function manipularEndereco (evento) {

    const cep = evento.target.value

    setEndereco({
      cep
    })

    if (cep && cep.length === 8) {
      // obter cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {

          //setEnderecos(lista => [...lista, endereco])

          setEndereco(enderecoAntigo => {
            return {
              ...enderecoAntigo,      
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf
            }
          })
        })
    }
  }

  return (
    <div className="App">
      <header className='App-header'>

        <input placeholder='Digite o CEP' onChange={manipularEndereco}/>

        <ul>
          <li>CEP: {endereco.cep}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>

      </header>
    </div>
  );
}

export default App;