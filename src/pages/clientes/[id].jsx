import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useClientesStore } from "@/stores/useClientesStore";
import FormularioCliente from "@/components/frames/FormularioCliente";

export default function EditarCliente() {
  const router = useRouter();
  const { id } = router.query;

  const consultarClientePorId = useClientesStore((state) => state.obtenerClientePorId);
  const actualizarCliente = useClientesStore((state) => state.editarCliente);

  const [cliente, setCliente] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    balance: "",
  });

  useEffect(() => {
    if (id) {
      consultarClientePorId(id).then((res) => {
        setCliente(res);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarCliente(id, cliente);
    router.push("/clientes");
  };

  return (
    <div className="bg-gray-100 w-full px-4 py-8">
      <FormularioCliente
        cliente={cliente}
        onChange={handleChange}
        onSubmit={handleSubmit}
        modo="editar"
      />
    </div>
  );
}
