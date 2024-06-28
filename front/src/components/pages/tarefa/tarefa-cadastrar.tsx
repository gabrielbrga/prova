import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../../../models/Categoria";

function TarefaCadastrar() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categoria, setCategoria] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/tarefa/listar")
      .then((resposta) => resposta.json())
      .then((tarefa: Tarefa[]) => {
        (tarefa);
      });
  }

  function cadastrarTarefa(e: any) {
    const tarefa: Tarefa = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
      categoria: categoria,
    };

    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/tarefa/cadastrar", {
      method: "POST",
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
      <h1>Cadastrar tarefa</h1>
      <form onSubmit={cadastrarTarefa}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o id"
          onChange={(e: any) => setId(e.target.value)}
          required
        />

        <br />
        <label>Quantidade:</label>
        <input
          type="text"
          placeholder="Digite o titulo"
          onChange={(e: any) => setTitulo(e.target.value)}
        />
        <br />
        <label>Descricao:</label>
        <input
          type="text"
          placeholder="Digite o descrição"
          onChange={(e: any) => setDescricao(e.target.value)}
        />
        <br />
        <label>categoriaId:</label>
        <input
          type="text"
          placeholder="Digite o valor"
          onChange={(e: any) => setCategoriaId(e.target.value)}
        />
        <br />
        <label>Categorias:</label>
        <select onChange={(e: any) => setCategoria(e.target.value)}>
          {categorias.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TarefaCadastrar;