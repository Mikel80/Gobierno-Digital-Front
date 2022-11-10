import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useRequest from "../hooks/useRequest";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [requestState, sendRequest] = useRequest();

  useEffect(() => {
    const requestUsers = async () => {
      const data = await sendRequest({
        endPoint: "user",
        method: "GET",
      });
      setUsers(data);
    };

    requestUsers();
  }, []);

  const toggleModal = () => {
    setShowModal((prev) => {
      return !prev;
    })
  }

  return (
    <div className="flex-1 px-8 py-10 relative">
      {showModal && (
        <div className="border left-[50%] top-[50%] absolute w-[30rem] h-[35rem] z-10 bg-gray-100">
          <div>X</div>
          <form>
            <input type="text" placeholder="Nombre" name="name" />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Registrar</button>
          </form>
        </div>
      )}
      {requestState.loading && <div>Loading...</div>}
      {requestState.error && <div>Algo Salio Mal</div>}
      <div className="flex w-full justify-between mb-4 items-center">
        <h1 className="text-lg pl-4">Lista de Usuarios</h1>
        <button className="border mr-4 px-2 py-1" onClick={toggleModal}>Nuevo +</button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Nombre
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Fecha de Creacion
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-4 px-6">{user.name}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">{user.created_at}</td>
              <td className="py-4 px-6">Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
