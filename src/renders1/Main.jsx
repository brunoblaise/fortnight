import React from 'react';



const Boardleader = React.lazy(() => import('../bodyT/Boardleader'));
const Welcome = React.lazy(() => import('../bodyT/Welcome'));
const Track = React.lazy(() => import('../bodyT/Track'));
function Main() {
  return (
    <div className='main-panel'>
      <div className='content-wrapper aerq'>
        <Welcome />

        <Track />

        <Boardleader />
      
      </div>
    </div>
  );
}

export default React.memo(Main);
