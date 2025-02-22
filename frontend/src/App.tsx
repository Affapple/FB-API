import React, { useState } from "react";
import axios from "axios";

function App() {
  const [utilizador, setUtilizador] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState(null);
  const [publicacoes, setPublicacoes] = useState<any[]>([]);
  const [contas, _] = useState(["Artur", "Pedro", "Vasco"]);

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/publicacoes", {
        utilizador: utilizador,
        titulo: titulo,
        texto: texto,
        imagem: imagem,
      })
      .then((response) => {
        console.log(response.data);
        setPublicacoes([...publicacoes, utilizador]);
        setTitulo("");
        setTexto("");
        setImagem(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função para lidar com o cancelamento
  const handleCancel = () => {
    setTitulo("");
    setTexto("");
    setImagem(null);
  };

  // Captura a imagem selecionada
  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "800px",
        border: "1px solid #ccc",
        margin: "20px auto",
      }}
    >
      {/* Coluna principal */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Formulário */}
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          {/* Campo Utilizador (select) */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ marginRight: "10px" }}>Utilizador:</label>
            <select
              value={utilizador != "" ? utilizador : "Selecione um utilizador"}
              onChange={(e) => setUtilizador(e.target.value)}
            >
              {contas.map((conta) => {
                return <option value={conta}>{conta}</option>;
              })}
            </select>
          </div>

          {/* Campo Título e data/hora ao lado */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="titulo"
              style={{ marginBottom: "15px", width: "100%" }}
            >
              Título:
            </label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{ marginBottom: "20px", width: "100%" }}
            />

            <label htmlFor="data" style={{ marginRight: "10px" }}>
              Data de publicação:
            </label>
            <input id="data" type="datetime-local" style={{ color: "#333" }} />
          </div>

          {/* Campo Texto (textarea) */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Texto:
            </label>
            <textarea
              value={texto}
              style={{ width: "100%", height: "150px" }}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>

          {/* Botão Upload Image */}
          <div style={{ marginBottom: "15px" }}>
            <input
              id="uploadImageInput"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          {/* Botões Cancel e Submit */}
          <div>
            <button
              type="button"
              onClick={handleCancel}
              style={{ marginRight: "10px" }}
            >
              cancel
            </button>
            <button type="submit">submit</button>
          </div>
        </form>
      </div>

      {/* Coluna lateral de Logs */}
      <div
        style={{
          width: "200px",
          borderLeft: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <h3>Logs</h3>
        {publicacoes.map((pub) => {
          return <p>{pub.utilizador}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
