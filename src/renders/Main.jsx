import React from 'react';

const Welcome = React.lazy(() => import('../body/Welcome'));
const Track = React.lazy(() => import('../body/Track'));
const Boardleader = React.lazy(() => import('../body/Boardleader'));
const Mymarks = React.lazy(() => import('../body/Mymarks'));
function Main() {
  return (
    <div className='main-panel'>
      <div className='content-wrapper'>
        <Welcome />
        <Track />

        <Boardleader />
        <Mymarks />
      </div>
    </div>
  );
}

export default React.memo(Main);
