import {useStoreState} from 'easy-peasy';
import React, {useEffect, useState} from 'react';
import {CSVLink} from 'react-csv';
import {Helmet} from 'react-helmet';

import {url} from '../../url';
function Around() {
  const {token} = useStoreState((state) => state.Auth);

  const [message, setMessage] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/Emailsel`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      setMessage(parseData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [setMessage]);

  return (
    <div className='col-lg-12 grid-margin stretch-cardy '>
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

        <title> report class</title>
      </Helmet>

      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Signed up Students</h4>
          <CSVLink data={message} className='btn btn-info'>
            Export
          </CSVLink>


          <div className='table-responsive pt-3'>
            <input
              className='form-control w-100'
              type='search'
              placeholder='Search name'
              id='Mail-rearch'
              value={search}
              name='search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <table className='table caption-top' id='emp'>
              <caption>List of Students</caption>
              <thead>
                <tr>
                  <th scope='col'> First Name</th>

                  <th scope='col'>Second Name</th>
                  <th scope='col'>Student class</th>

                  <th scope='col'>Email</th>
                </tr>
              </thead>
              {loading
                ? 'loading..'
                : message
                    .filter((val) => {
                      if (search === '') {
                        return val;
                      } else if (
                        val.student_fname
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((fil) => (
                      <tbody key={fil.tiled_id}>
                        <tr>
                          <td>{fil.student_fname}</td>
                          <td>{fil.student_lname}</td>
                          <td>{fil.class_student}</td>

                          <td>{fil.student_email}</td>
                        </tr>
                      </tbody>
                    ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Around);
