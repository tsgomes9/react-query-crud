import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, DivInputs, CardUser, HeaderContainer, Input } from "./style";

interface UserProps {
  id: number;
  nome: string;
  idade: string;
}

export default function RQueryApi() {
  const [showInputEdit, setShowInputEdit] = useState<boolean>(false);
  const [showInputCreate, setShowInputCreate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [editAge, setEditAge] = useState<string>("");
  const [editId, setEditId] = useState<number>(0);

  //CREATE
  const handleCreate = () => {
    axios
      .post("http://localhost:3001/usuarios", { nome: name, idade: age })
      .then((response) => {
        setName("");
        setAge("");
        refetch();
        setShowInputCreate(false);
      });
  };

  const handleShowCreate = () => {
    setShowInputCreate(true);
    setShowInputEdit(false);
  };

  // UPDATE
  const updateUserMutation = useMutation(
    (updatedUser: UserProps) =>
      axios.patch(`http://localhost:3001/usuarios/${editId}`, updatedUser),

    {
      onSuccess: () => {
        refetch();
        setShowInputEdit(false);
      },
      onError: (error) => {
        console.log("Erro ao atualizar dados do usuário: ", error);
      },
    }
  );

  const handleUpdateUser = (id: number) => {
    const updatedUser: UserProps = {
      id: id,
      nome: editName,
      idade: editAge,
    };

    updateUserMutation.mutate(updatedUser);
    setEditId(0);
    setEditName("");
    setEditAge("");
  };

  const handleShowEdit = (id: number, nome: string, idade: string) => {
    setShowInputEdit(true);
    setShowInputCreate(false);
    setEditId(id);
    setEditName(nome);
    setEditAge(idade);
  };

  const handleCancelEdit = () => {
    setShowInputEdit(false);
    setEditName("");
    setEditAge("");
  };

  // DELETE

  const deleteUserMutation = useMutation(
    (id: number) => axios.delete(`http://localhost:3001/usuarios/${id}`),
    {
      onSuccess: () => {
        refetch();
      },

      onError: (error) => {
        console.log("Erro ao excluir usuário: ", error);
      },
    }
  );

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  // READ
  const { isLoading, data, refetch } = useQuery<UserProps[]>("usersData", () =>
    axios
      .get<UserProps[]>("http://localhost:3001/usuarios")
      .then((response) => response.data)
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h4>Lista de usuários</h4>
      <Button onClick={handleShowCreate}>CADASTRAR</Button>
      <hr />

   
        {showInputEdit && (
          <DivInputs>
            <h4>Editar usuário</h4>
            <Input
              value={editName}
              type="text"
              placeholder="novo nome"
              onChange={(e) => setEditName(e.target.value)}
            />
            <Input
              value={editAge}
              type="number"
              placeholder="nova idade"
              onChange={(e) => setEditAge(e.target.value)}
            />
            <div>
            <Button onClick={() => handleUpdateUser(editId)}>Confirmar</Button>
            <Button onClick={handleCancelEdit}>Cancelar</Button>
            </div>
          </DivInputs>
        )}

        {showInputCreate && (
          <DivInputs>
            <h4>Cadastrar usuário</h4>
            <Input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={"nome"}
            />
            <Input
              value={age}
              type="text"
              onChange={(e) => setAge(e.target.value)}
              placeholder={"idade"}
            />
            <div>
            <Button onClick={handleCreate}>Confirmar</Button>
            <Button onClick={() => setShowInputCreate(false)}>Cancelar</Button>
            </div>
          </DivInputs>
        )}

        {data &&
          data.map((user) => (
            <HeaderContainer key={user.id}>
              <CardUser>
                <p>Nome: {user.nome}</p>
                <p>Idade: {user.idade}</p>
                <Button
                  onClick={() => handleShowEdit(user.id, user.nome, user.idade)}
                >
                  Editar
                </Button>
                <Button onClick={() => handleDeleteUser(user.id)}>
                  Excluir
                </Button>
              </CardUser>
            </HeaderContainer>
          ))}
      
    </div>
  );
}
