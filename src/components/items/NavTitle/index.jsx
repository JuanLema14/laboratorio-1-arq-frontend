import React from 'react';
import Link from 'next/link';

const Index = ({ title, link }) => {
  return (
    <Link href={link}>
      <div className='h-20 flex items-center justify-center text-secondary text-xl lg:text-base lg:text-gris hover:text-secondary hover:cursor-pointer hover:border-b-2 hover:border-primary'>
        <h1 className='text-base font-normal'>{title}</h1>
      </div>
    </Link>
  );
};

export default Index;
