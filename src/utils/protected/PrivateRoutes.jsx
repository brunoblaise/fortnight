import {useStoreState} from 'easy-peasy';
import React from 'react';

import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoutes = () => {
  const {Auth} = useStoreState((state) => state);

  const {isAuth} = Auth;

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='https://www.lyceedekigali.ac.rw/' />
  );
};

export default PrivateRoutes;
