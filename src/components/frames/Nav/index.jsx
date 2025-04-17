import React from "react";
import NavTitle from "@/components/items/NavTitle";

const Index = () => {
  return (
    <nav className="flex flex-row items-center justify-around bg-white shadow-md h-20 w-full">
      <div>
        <img src="/logo.png" alt="logo" className="w-24 h-auto" />
      </div>

      <div className="flex flex-row items-center justify-between w-1/3">
        <NavTitle title="Clientes" link="/clientes" />
        <NavTitle title="Transacciones" link="/transacciones" />
      </div>
    </nav>
  );
};

export default Index;
