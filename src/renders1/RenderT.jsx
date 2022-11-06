import React from 'react';

const Main = React.lazy(() => import('./Main'));
const Sidebar = React.lazy(() => import('../sidebar1/Sidebar'));
const Header = React.lazy(() => import('../header1/Header'));
function RenderT({setAuth}) {
  return (
    <div className='App'>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar setAuth={setAuth} />

        <Main />
      </div>
    </div>
  );
}

export default React.memo(RenderT);
