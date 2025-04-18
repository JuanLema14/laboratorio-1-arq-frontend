import { useState } from "react";
import { useRouter } from "next/router";
import { useClientesStore } from "@/stores/useClientesStore";
import FormularioCliente from "@/components/frames/FormularioCliente";
import { ToastContainer } from "react-toastify";

export default function CrearCliente() {
  const router = useRouter();
  const crearCliente = useClientesStore((state) => state.crearCliente);

  const [cliente, setCliente] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    balance: "",
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearCliente(cliente);
    router.push("/clientes");
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <FormularioCliente
        cliente={cliente}
        onChange={handleChange}
        onSubmit={handleSubmit}
        modo="crear"
      />
    </div>
  );
}
