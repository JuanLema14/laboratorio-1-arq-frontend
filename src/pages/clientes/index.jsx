import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useClientesStore } from "@/stores/useClientesStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Clientes = () => {
  const [busqueda, setBusqueda] = useState("");
  const { clientes, cargando, error, obtenerClientes } = useClientesStore();
  const  router = useRouter()

  useEffect(() => {
    obtenerClientes();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSearch = () => {
    const filtros = {
      firstName: busqueda,
    };
    obtenerClientes(filtros);
  };

  return (
    <div className="p-6 min-h-screen font-sans bg-gray-50">
      <ToastContainer />

      <div className="flex justify-between items-center bg-white shadow-md rounded-2xl p-5 mb-6 transition-all duration-300">
        <div className="relative flex-1">
          <Icon
            icon="material-symbols:search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
          />
          <input
            type="text"
            placeholder="Buscar cliente"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 bg-primary font-semibold text-white rounded-lg hover:bg-secondary transition-all"
        >
          Buscar
        </button>

        <button
          onClick={() => router.push("/clientes/crear")}
          className="ml-4 px-4 py-2 bg-primary font-semibold text-white rounded-lg hover:bg-secondary transition-all"
        >
          Crear Cliente
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Apellido
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Nro. de cuenta
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Saldo
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {cargando ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-blue-600 flex justify-center items-center"
                >
                  <Icon
                    icon="line-md:loading-loop"
                    className="animate-spin text-3xl"
                  />
                  <span className="ml-3 text-blue-500">
                    Cargando clientes...
                  </span>
                </td>
              </tr>
            ) : clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800">
                    {cliente.firstName}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {cliente.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {cliente.accountNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    ${cliente.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-800 flex space-x-2">
                    <button
                      onClick={() => router.push(`/clientes/${cliente.id}`)}
                      className="px-3 py-1 bg-transparent text-primary hover:text-secondary hover:cursor-pointer"
                    >
                      <Icon icon="material-symbols:edit" className="text-lg" />
                    </button>

                    <button
                      onClick={() =>
                        toast.info(`Eliminar cliente con ID: ${cliente.id}`)
                      }
                      className="px-3 py-1 bg-transparent text-primary hover:text-secondary hover:cursor-pointer"
                    >
                      <Icon
                        icon="material-symbols:delete"
                        className="text-lg"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-6 text-gray-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
