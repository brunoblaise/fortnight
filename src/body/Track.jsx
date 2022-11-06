import React, {useEffect, useState} from 'react';
import people from '../images/dashboard/people.svg';

const Numwork = React.lazy(() => import('./Numwork'));
const Numnotes = React.lazy(() => import('./Numnotes'));

import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
function Track() {
  const [message, setMessage] = useState([]);

  const getProfile = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/', {
        method: 'GET',
      });

      const parseData = await res.json();

      setMessage(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [setMessage]);

  return (
    <div className='row'>
      <div className='col-md-6 grid-margin stretch-card'>
        <div className='card tale-bg'>
          <div className='card-people mt-auto'>
            <LazyLoadImage
              effect='blur'
              width='464.5px'
              height='241.87px'
              src={people}
              alt='people'
            />
            <div className='weather-info'>
              <div className='d-flex'>
                <div className='ml-2'>
                  <h4 className='location font-weight-normal'>
                    {message.country_name}
                  </h4>
                  <h6 className='font-weight-normal'>{message.city}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-6 grid-margin transparent'>
        <div className='row'>
          <Numnotes />
          <Numwork />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Track);
