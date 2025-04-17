import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import NavTitle from '@/components/items/NavTitle';

const Index = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex relative flex-row items-center justify-between bg-white shadow-md h-16 w-full p-5'>
      <div>
        <img src='/logo.png' alt='logo' className="w-24 h-auto" />
      </div>
      <div>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className='hover:cursor-pointer hover:bg-gray-200 text-secondary hover:text-primary  p-2'
        >
          <Icon icon={`${open ? 'ic:baseline-close' : 'ic:outline-menu'}`} width='24' height='24' />
        </button>
        {}
      </div>
      {open && (
        <div className='bg-white shadow-md  w-5/6 p-5 absolute inset-x-10 top-20 rounded-md '>
          <NavTitle title="Clientes" link="/clientes" />
          <NavTitle title="Transacciones" link="/transacciones" />
        </div>
      )}
    </div>
  );
};

export default Index;
