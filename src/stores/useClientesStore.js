import { create } from "zustand";
import api from "@/lib/axios";

export const useClientesStore = create((set) => ({
  clientes: [],
  cargando: false,
  error: null,

  obtenerClientes: async (filtros = {}) => {
    set({ cargando: true, error: null });
    try {
      const { data } = await api.get("/customers/listar", {
        params: filtros,
      });
      set({ clientes: data });
    } catch (err) {
      console.error(err);
      set({ error: "No se pudieron cargar los clientes" });
    } finally {
      set({ cargando: false });
    }
  },

  crearCliente: async (cliente) => {
    set({ cargando: true, error: null });
    try {
      await api.post("/customers/crear", cliente);
    } catch (err) {
      console.error("Error al crear cliente:", err);
      set({ error: "No se pudo crear el cliente" });
    } finally {
      set({ cargando: false });
    }
  },

  editarCliente: async (id, clienteActualizado) => {
    set({ cargando: true, error: null });
    try {
      await api.put(`/customers/${id}`, clienteActualizado);
    } catch (err) {
      console.error("Error al actualizar cliente:", err);
      set({ error: "No se pudo actualizar el cliente" });
    } finally {
      set({ cargando: false });
    }
  },

  obtenerClientePorId: async (id) => {
    set({ cargando: true, error: null });
    try {
      const { data } = await api.get(`/customers/${id}`);
      return data;
    } catch (err) {
      console.error("Error al obtener cliente:", err);
      set({ error: "No se pudo obtener el cliente" });
      return null;
    } finally {
      set({ cargando: false });
    }
  },
}));
