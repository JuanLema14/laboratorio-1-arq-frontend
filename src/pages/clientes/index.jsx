import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useClientesStore } from "@/stores/useClientesStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Clientes = () => {
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const { clientes, cargando, error, obtenerClientes, eliminarCliente } =
    useClientesStore();
  const router = useRouter();

  const [filtros, setFiltros] = useState({
    firstName: "",
    lastName: "",
    balanceMin: "",
    balanceMax: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const cleanValue = value.replace(/[^\d]/g, "");

    setFiltros((prev) => ({
      ...prev,
      [name]: cleanValue,
    }));
  };

  const handleSearch = () => {
    const parseCurrency = (value) =>
      value ? parseFloat(value.replace(/[^\d.-]/g, "")) : undefined;

    const filtrosEnviados = {
      firstName: filtros.firstName || undefined,
      lastName: filtros.lastName || undefined,
      balanceMin: parseCurrency(filtros.balanceMin),
      balanceMax: parseCurrency(filtros.balanceMax),
    };

    obtenerClientes(filtrosEnviados);
  };

  const confirmarEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarConfirmacion(true);
  };

  const ejecutarEliminacion = async () => {
    try {
      await eliminarCliente(clienteAEliminar.id);
      toast.success("Cliente eliminado correctamente.");
      setMostrarConfirmacion(false);
      obtenerClientes();
    } catch (error) {
      toast.error("Hubo un error al eliminar el cliente.");
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="p-8">
      <ToastContainer />

      <div className="bg-white shadow-xl rounded-2xl p-5 mb-6 transition-all duration-300">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-auto p-2">
              <img src="/logo_isotipo.png" alt="logo" />
            </div>
            <span className="text-gray-700 font-bold text-3xl">
              Filtro de busqueda de Clientes
            </span>
          </div>
          <button
            onClick={() => router.push("/clientes/crear")}
            className="px-4 py-2 bg-primary font-semibold hover:cursor-pointer text-white rounded-lg hover:bg-secondary transition-all"
          >
            Crear Cliente
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={filtros.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={filtros.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="balanceMin"
            placeholder="Saldo mínimo"
            value={
              filtros.balanceMin
                ? parseInt(filtros.balanceMin).toLocaleString("es-CO")
                : ""
            }
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="balanceMax"
            placeholder="Saldo máximo"
            value={
              filtros.balanceMax
                ? parseInt(filtros.balanceMax).toLocaleString("es-CO")
                : ""
            }
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center mt-4 space-x-4">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-primary font-semibold text-white rounded-lg hover:bg-secondary transition-all hover:cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </div>
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
                <td colSpan="5" className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Icon
                      icon="eos-icons:three-dots-loading"
                      className="text-5xl text-blue-600 animate-pulse"
                    />
                    <p className="text-blue-600 font-semibold animate-pulse">
                      Estamos cargando la información de los clientes...
                    </p>
                  </div>
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
                      onClick={() => confirmarEliminacion(cliente)}
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

      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">¿Estás seguro?</h2>
            <p className="mb-6 text-gray-600">
              ¿Deseas eliminar al cliente{" "}
              <span className="font-bold">
                {clienteAEliminar.firstName} {clienteAEliminar.lastName}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:cursor-pointer transition"
              >
                Cancelar
              </button>
              <button
                onClick={ejecutarEliminacion}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary hover:cursor-pointer transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
