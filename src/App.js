import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras

  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };
  //Prática I
  const saveLocalStorage = () => {
    const listaString = JSON.stringify(listaCompras);
    localStorage.setItem("lista", listaString);
  };
  // Prática II
  const getItemsLocalStorage = () => {
    //pega do local storage
    // mostra na tela
    const listaArray = JSON.parse(localStorage.getItem("lista"));
    listaArray && setListaCompras(listaArray);
  };

  const removeLocalStorage = () => {
    localStorage.removeItem("lista");
    setListaCompras([]);
  };

  //useEffect-ciclo de vida- acontece 1 vez assim que a página é montada
  // se quiser que alguma coisa aconteça qnd o estado é atualizado-useEffect
  useEffect(() => {
    console.log("useEffect pegar do localStorage");
    //agora podemos comentar este botão abaixo, pq já vai pegar automatico
    getItemsLocalStorage();
  }, []);

  useEffect(() => {
    //acontece toda vez que o estado listaCompras é atualizado
    //quando é passado listaCompras na dependência, está sendo dito que toda vez que este estado for atualizado, alguma coisa vai acontecer.
    if (listaCompras.length) {
      saveLocalStorage();
    }
  }, [listaCompras]);
  //podemos comentar o botão de saveLocalStotage

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      {/* <button onClick={saveLocalStorage}>Salvar no Local Storage</button> */}
      {/* <button onClick={getItemsLocalStorage}>Pegar do Local Storage</button> */}
      <button onClick={removeLocalStorage}>Remove do Local Storage</button>
      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
