import React from 'react';
const Fallback = () => {
  return (
    <p className='fall'>
      There was error when trying to load the app Refresh your web app or
      contact the creators of the web app to help you.
    </p>
  );
};

export default React.memo(Fallback);
