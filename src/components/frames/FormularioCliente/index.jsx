import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export default function FormularioCliente({
  cliente,
  onChange,
  onSubmit,
  modo = "crear",
}) {
  const router = useRouter();

  return (
    <div className="bg-white shadow-2xl rounded-3xl p-6 w-full relative">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-auto p-2">
            <img src="/logo_isotipo.png" alt="logo" />
          </div>
          <span className="text-gray-700 font-bold text-3xl">
            {modo === "crear"
              ? "Formulario de creación de Cliente"
              : "Formulario de edición de Cliente"}
          </span>
        </div>
        <button
          onClick={() => router.back()}
          className="my-4 p-4 rounded-2xl transition flex gap-2 hover:cursor-pointer"
        >
          <Icon icon="mdi:arrow-left" className="text-gray-700 text-2xl" />
          <span className="text-gray-700 font-semibold">Volver atrás</span>
        </button>
      </div>

      {/* Formulario */}
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="firstName"
          placeholder="Nombre"
          value={cliente.firstName}
          onChange={onChange}
          className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="lastName"
          placeholder="Apellido"
          value={cliente.lastName}
          onChange={onChange}
          className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="accountNumber"
          placeholder="Nro. de cuenta"
          value={cliente.accountNumber}
          onChange={onChange}
          className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="balance"
          placeholder="Saldo"
          type="number"
          value={cliente.balance}
          onChange={onChange}
          className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </form>

      {/* Botón guardar */}
      <button
        type="submit"
        onClick={onSubmit}
        className="bg-primary my-4 p-4 rounded-2xl hover:bg-secondary transition flex gap-2 hover:cursor-pointer"
      >
        <span className="text-white font-semibold">
          {modo === "crear" ? "Guardar" : "Actualizar"}
        </span>
        <Icon icon="mdi:content-save" className="text-white text-2xl" />
      </button>
    </div>
  );
}
