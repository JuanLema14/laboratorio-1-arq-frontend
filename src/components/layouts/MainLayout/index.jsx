import React from 'react';
import Nav from '@/components/frames/Nav';
import NavMobile from '@/components/frames/Navmobile';

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className='block lg:hidden'>
        <NavMobile />
      </div>
      <div className='hidden lg:block'>
        <Nav />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
