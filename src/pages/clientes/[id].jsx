// src/pages/clientes/[id].jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useClientesStore } from "@/stores/useClientesStore";
import { Icon } from "@iconify/react";

export default function EditarCliente() {
  const router = useRouter();
  const { id } = router.query;

  const { obtenerClientePorId, editarCliente } = useClientesStore();
  const [cliente, setCliente] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    balance: "",
  });

  useEffect(() => {
    if (id) {
      obtenerClientePorId(id)
        .then(setCliente)
        .catch(() => alert("Error cargando datos del cliente"));
    }
  }, [id]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editarCliente(id, cliente);
    router.push("/clientes");
  };

  return (
    <div className=" bg-gray-100 w-full px-4 py-8">
      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full relative">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-auto p-2">
              <img src="/logo_isotipo.png" alt="logo" />
            </div>
            <span className="text-gray-700 font-bold text-3xl">
              Formulario de edición de Cliente
            </span>
          </div>
          <button
            onClick={() => router.back()}
            className="bg-primary my-4 p-4 rounded-2xl hover:bg-secondary transition flex gap-2 hover:cursor-pointer"
          >
            <span className="text-white font-semibold">Volver atrás</span>
            <Icon icon="mdi:arrow-left" className="text-white text-2xl" />
          </button>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="firstName"
            placeholder="Nombre"
            value={cliente.firstName}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="lastName"
            placeholder="Apellido"
            value={cliente.lastName}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="accountNumber"
            placeholder="Nro. de cuenta"
            value={cliente.accountNumber}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="balance"
            placeholder="Saldo"
            type="number"
            value={cliente.balance}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </form>

        {/* Botón guardar */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-primary my-4 p-4 rounded-2xl hover:bg-secondary transition flex gap-2 hover:cursor-pointer"
        >
          <span className="text-white font-semibold">Guardar cambios</span>
          <Icon icon="mdi:content-save" className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
}
