import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useClientesStore } from "@/stores/useClientesStore";
import { useTransaccionesStore } from "@/stores/useTransaccionesStore";
import { Icon } from "@iconify/react";
import Image from "next/image";

const getIniciales = (nombre) => {
  return nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const HistorialTransacciones = () => {
  const router = useRouter();
  const { id } = router.query;

  const [cliente, setCliente] = useState(null);

  const { obtenerClientePorId } = useClientesStore();
  const {
    transacciones,
    cargando,
    error,
    obtenerTransaccionesPorCuenta,
    limpiarTransacciones,
  } = useTransaccionesStore();

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      limpiarTransacciones();

      const clienteData = await obtenerClientePorId(id);
      setCliente(clienteData);

      if (clienteData?.accountNumber) {
        await obtenerTransaccionesPorCuenta(clienteData.accountNumber);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Cabecera cliente */}
      <div className="diagonal-header flex items-center justify-between p-6 rounded-xl shadow-sm relative">
        <div className="flex items-center space-x-4 z-10">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg">
            {cliente?.nombre ? (
              getIniciales(cliente.firstName)
            ) : (
              <Icon icon="mdi:account" />
            )}
          </div>
          <div className="text-lg font-medium text-gray-800">
            {cliente?.firstName + " " + cliente?.lastName || "Cargando..."}
          </div>
        </div>
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
          <Image
            src="/logo_isotipo.png"
            alt="logo billetera"
            width={30}
            height={30}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-700">
        Historial de Transacciones
      </h2>

      {cargando ? (
        <p className="text-gray-500">Cargando transacciones...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : transacciones.length === 0 ? (
        <p className="text-gray-500">
          Este cliente aún no tiene transacciones.
        </p>
      ) : (
        <div className="relative space-y-6 ml-6">
          {transacciones.map((trans) => {
            const esIngreso =
              trans.receiverAccountNumber === cliente?.accountNumber;
            const badgeColor = esIngreso
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800";
            const badgeText = esIngreso ? "Ingreso" : "Egreso";

            return (
              <div
                key={trans.id}
                className="relative pl-8 pr-4 py-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <span className="absolute left-[-2vmax] top-7 w-4 h-4 bg-primary rounded-full z-10" />

                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(trans.id)}
                >
                  <div>
                    <p className="font-semibold text-gray-700">
                      Transacción - ${trans.amount.toLocaleString("es-CO")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(trans.timestamp).toLocaleString("es-CO")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}
                    >
                      {badgeText}
                    </span>
                    <Icon
                      icon={
                        expandedId === trans.id
                          ? "mdi:chevron-up"
                          : "mdi:chevron-down"
                      }
                      className="text-2xl text-gray-400"
                    />
                  </div>
                </div>

                {expandedId === trans.id && (
                  <div className="mt-4 flex items-center justify-between ">
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>De:</strong> {trans.senderAccountNumber}
                      </p>
                      <p>
                        <strong>Para:</strong> {trans.receiverAccountNumber}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Descripción:</strong>{" "}
                        {trans.description || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistorialTransacciones;
