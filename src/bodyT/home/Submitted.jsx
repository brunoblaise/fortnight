import React, {useEffect, useState} from 'react';


import {Helmet} from 'react-helmet';
import Header from '../../header1/Header';
import Sidebar from '../../sidebar1/Sidebar';

import {url} from '../../url';
import {Link, useParams} from 'react-router-dom';
import {useStoreState} from 'easy-peasy';
import {CSVLink} from 'react-csv';

function Submitted() {
  const [message, setMessage] = useState([]);

  const {id} = useParams();
  const {User} = useStoreState((state) => state);

  const {profile} = User;
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const own = profile.map((profil) => profil.teacher_email);
  const [teacher] = useState(own[0]);
  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/answers`, {
        method: 'GET',
      });

      const parseData = await res.json();

      setMessage(
        parseData.filter(
          (fil) => fil.teacher_email === teacher && fil.level === id,
        ),
      );
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [setMessage]);

  console.log(message);
  return (
    <div>
      <div className='col-lg-12 grid-margin stretch-card'>
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

          <title> Create</title>
        </Helmet>
        <Header />
        <div className='container-fluid page-body-wrapper'>
          <Sidebar />
          <div className='content-wrapper'>
            <div className='card'>
              <div className='card-body'>
                <h4 className='card-title'></h4>
                <CSVLink data={message} className='btn btn-info'>
                  Export
                </CSVLink>
                <div className='table-responsive pt-3'>
                  <input
                    className='form-control w-100'
                    type='search'
                    placeholder='Search notes'
                    id='Mail-rearch'
                    value={search}
                    name='search'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <table className='table caption-top' id='emp'>
                    <caption>List of answers</caption>
                    <thead>
                      <tr>
                        <th scope='col'>Email</th>

                        <th scope='col'>Level</th>
                        <th scope='col'>Name of the work </th>
                        <th scope='col'>Teacher</th>
                      </tr>
                    </thead>
                    {loading
                      ? 'loading..'
                      : message
                          .filter((val) => {
                            if (search === '') {
                              return val;
                            } else if (
                              val.course_name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((fil) => (
                            <tbody key={fil.id}>
                              <tr>
                                <td>
                                  <Link to={`/course/${fil.course_name}`}>
                                    {fil.student_email}
                                  </Link>
                                </td>

                                <td>{fil.level}</td>
                                <td>{fil.course_name}</td>
                                <td>{fil.teacher_email}</td>
                              </tr>
                            </tbody>
                          ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submitted;
