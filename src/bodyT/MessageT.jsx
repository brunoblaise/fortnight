import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import {Helmet} from 'react-helmet';
import { url } from '../url';
function MessageT() {
    const [classer, setClass] = useState("")
    const fetchClass = async () => {
    try {
      const res = await fetch(`${url}/get/className`, {
        method: 'GET',
      });

      const parseData = await res.json();

      setClass(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=>{
    fetchClass()
  }, [])

  console.log(classer)
  return (
    <div className='__main'>
      <Helmet>
        <meta name='title' content='college du christ roi' />
        <meta
          http-equiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
        <meta name='language' content='EN' />
        <meta name='author' content='Mudacumura brunoblaise' />
        <meta name='creationdate' content='29/07/2020' />
        <meta name='distribution' content='global' />
        <meta name='rating' content='general' />

        <title>Message</title>
      </Helmet>

      <>
        <div className='row12 row-cols-1'>
          <div className='col fut'>
            <div className='card h-100'>
              <div className='card-body'>
                <h5 className='card-title '>Board 1</h5>
                <p className='card-text'>

                   
                <Link to='/messageT/tch' className='row'>
                 

                 <p className='mb-2 mb-xl-0'>Teacher</p>
               </Link>
            
                  {classer.map((data) => (
                        
                          <Link to={`/messageT/${data.name}`} key={data.name_id}  className='row'>
                 

                 <p className='mb-2 mb-xl-0'>{data.name}</p>
               </Link>
                        ))}
                </p>
              </div>
            </div>
          </div>

      
        </div>
        <div className='row align-items-center justify-content-end connecting-lines d-flex'>
          <div className='col-6 text-right'>
            <h4 className='uw'>Education</h4>
            <p className='uw'>
              Educating the mind without educating the heart is no education at
              all. That is what differentiate us from the rest, that is why we
              are the best in every thing we do no matter how difficult we
              always find a way
            </p>
          </div>
          <div className='col-2 text-center full d-inline-flex justify-content-center align-items-center'>
            <div className='circle font-weight-bold'>
              <i className='fa fa-check'></i>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default React.memo(MessageT);
