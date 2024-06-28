import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tarefa } from "../../../models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/tarefa/listar")
      .then((resposta) => resposta.json())
      .then((tarefas: Tarefa[]) => {
        console.table(tarefas);
        setTarefas(tarefas);
      });
  }

  return (
    <div>
      <h1>Listar tarefas</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>titulo</th>
            <th>descrição</th>
            <th>categoria</th>
            <th>Criado Em</th>
            <th>Deletar</th>
            <th>Alterar</th>
          </tr>
        </thead>
          
        
      </table>
    </div>
  );
}

export default TarefaListar;