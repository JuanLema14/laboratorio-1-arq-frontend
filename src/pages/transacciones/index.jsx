import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useClientesStore } from "@/stores/useClientesStore";
import { useTransaccionesStore } from "@/stores/useTransaccionesStore";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

const Transacciones = () => {
  const { clientes, obtenerClientes } = useClientesStore();
  const { createTransaction, loading } = useTransaccionesStore();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    obtenerClientes();
  }, []);

  const handleTransfer = async () => {
    if (!origen || !destino || !monto) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (origen === destino) {
      toast.error("La cuenta de origen y destino deben ser diferentes.");
      return;
    }

    try {
      await createTransaction({
        senderAccountNumber: origen,
        receiverAccountNumber: destino,
        amount: parseFloat(monto),
        description: descripcion
      });

      setOrigen("");
      setDestino("");
      setMonto("");
      setDescripcion("");
    } catch (error) {}
  };

  return (
    <div className="p-8">
      <ToastContainer />

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo_isotipo.png" alt="logo" className="w-10 h-auto" />
          <h1 className="text-3xl font-bold text-gray-700">
            Realizar Transacción
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Cuenta Origen
            </label>
            <select
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">Selecciona una cuenta</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.accountNumber}>
                  {cliente.firstName} {cliente.lastName} -{" "}
                  {cliente.accountNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Cuenta Destino
            </label>
            <select
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">Selecciona una cuenta</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.accountNumber}>
                  {cliente.firstName} {cliente.lastName} -{" "}
                  {cliente.accountNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Monto a Transferir
            </label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="$0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Descripción (opcional)
            </label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Pago de servicios"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleTransfer}
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-secondary"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Icon icon="line-md:loading-twotone-loop" className="text-xl" />
                Procesando...
              </span>
            ) : (
              <>
                <Icon
                  icon="fluent:money-hand-20-filled"
                  className="inline mr-2"
                />
                Transferir
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transacciones;
