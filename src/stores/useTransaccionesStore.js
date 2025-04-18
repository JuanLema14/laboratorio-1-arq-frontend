import { create } from "zustand";
import api from "@/lib/axios";
import { toast } from "react-toastify";

export const useTransaccionesStore = create((set) => ({
  transacciones: [],
  cargando: false,
  error: null,
  loading: false,

  obtenerTransaccionesPorCuenta: async (accountNumber) => {
    set({ cargando: true, error: null });
    try {
      const { data } = await api.get(`/transactions/account/${accountNumber}`);
      set({ transacciones: data });
    } catch (err) {
      console.error("Error al obtener transacciones:", err);
      set({ error: "No se pudieron cargar las transacciones" });
    } finally {
      set({ cargando: false });
    }
  },

  limpiarTransacciones: () => set({ transacciones: [], error: null }),

  createTransaction: async ({
    senderAccountNumber,
    receiverAccountNumber,
    amount,
    description
  }) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/transactions", {
        senderAccountNumber,
        receiverAccountNumber,
        amount,
        description,
      });

      toast.success("Transacción exitosa!!");
      return data;
    } catch (error) {
      console.error("Error en la transacción:", error);
      const mensaje =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Error al realizar la transacción.";
      toast.error(mensaje);
      set({ error: mensaje });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
