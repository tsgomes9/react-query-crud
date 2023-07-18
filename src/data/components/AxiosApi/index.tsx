import axios from "axios";
import { useEffect, useState } from "react";

interface UserProps {
  id: number;
  nome: string;
  idade: string;
}

export default function AxiosApi() {
  const [users, setUsers] = useState<UserProps[]>([]);

  const [showInputEdit, setShowInputEdit] = useState(false);
  const [showInputCreate, setShowInputCreate] = useState(false);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const [editName, setEditName] = useState<string>("");
  const [editAge, setEditAge] = useState<string>("");
  const [editId, setEditId] = useState<number>(0);

  // CREATE
  const handleCreate = () => {
    axios
      .post("http://localhost:3001/usuarios", { nome: name, idade: age })
      .then((response) => {
        const newUser: UserProps = {
          id: response.data.id,
          nome: name,
          idade: age,
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setName("");
        setAge("");
      });
  };

  // READ
  useEffect(() => {
    axios
      .get("http://localhost:3001/usuarios")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Erro: ", error));
  }, []);

  // UPDATE
  const handleEdit = (id: number) => {
    const idUser = users.find((user) => user.id === id);
    idUser &&
      axios
        .patch(`http://localhost:3001/usuarios/${id}`, {
          nome: editName,
          idade: editAge,
        })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id
                ? { ...user, nome: editName, idade: editAge }
                : user
            )
          );
          setEditId(0);
          setEditName("");
          setEditAge("");
          setShowInputEdit(!showInputEdit);
        })
        .catch((error) => console.log("Erro: ", error));
  };

  // DELETE
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/usuarios/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => console.log("Erro: ", error));
  };

  const handleShowEdit = (id: number, nome: string, idade: string) => {
    setShowInputEdit(true);
    setShowInputCreate(false);
    setEditId(id);
    setEditName(nome);
    setEditAge(idade);
  };

  const handleShowCreate = () => {
    setShowInputCreate(!showInputCreate);
    setShowInputEdit(false);
  };

  return (
    <div className="App">
      <h4>Lista de usuários</h4>
      <button onClick={handleShowCreate}>CADASTRAR NOVO</button>

      
      <hr />

      {users.map((user) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "400px" }}>
            <p key={user.id}>Nome: {user.nome}</p>
            <p>Idade: {user.idade}</p>
            <button
              onClick={() => handleShowEdit(user.id, user.nome, user.idade)}
            >
              Editar
            </button>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
            <hr />
          </div>
        </div>
      ))}

      {showInputEdit && (
        <div>
          <h4>Editar usuário</h4>
          <input
            value={editName}
            type="text"
            placeholder={"novo nome"}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            value={editAge}
            type="number"
            placeholder={"nova idade"}
            onChange={(e) => setEditAge(e.target.value)}
          />
          <button onClick={() => handleEdit(editId)}>Confirmar</button>
          <button onClick={() => setShowInputEdit(false)}>Cancelar</button>
        </div>
      )}

      {showInputCreate && (
        <div>
          <h4>Cadastrar usuário</h4>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder={"nome"}
          />
          <input
            value={age}
            type="text"
            onChange={(e) => setAge(e.target.value)}
            placeholder={"idade"}
          />
          <button onClick={() => handleCreate()}>Confirmar</button>
          <button onClick={() => setShowInputCreate(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
