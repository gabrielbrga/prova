import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { useNavigate, useParams } from "react-router-dom";

function TarefaAlterar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5225/api/produto/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((tarefa: Tarefa) => {
          setTitulo(tarefa.titulo);
          setDescricao(tarefa.descricao);
          setCategoria(tarefa.categoria.toString());
          
        });
    }
  }, []);

  function alterarTarerfa(e: any) {
    const tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      categoriaId: "05bdf537-a841-4c50-8823-2e234d0bf0b0",
    };
    //FETCH ou AXIOS
    fetch(`http://localhost:5225/api/produto/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => resposta.json())
      .then((tarefa: Tarefa) => {
        navigate("/pages/tarefa/listar");
      });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Alterar Produto</h1>
      <form onSubmit={alterarTarerfa}>
        <label>titulo:</label>
        <input
          type="text"
          value={titulo}
          placeholder="Digite o titulo"
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Descricao:</label>
        <input
          type="text"
          value={descricao}
          placeholder="Digite o descrição"
          onChange={(e: any) => setDescricao(e.target.value)}
        />
        <br />
        <label>Quantidade:</label>
        <input
          type="text"
          value={categoria}
          placeholder="Digite o quantidade"
          onChange={(e: any) => setCategoria(e.target.value)}
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default TarefaAlterar;