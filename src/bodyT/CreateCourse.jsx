import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

import {Link} from 'react-router-dom';
import {url} from '../url';

import {useStoreState} from 'easy-peasy';
import {CSVLink} from 'react-csv';
const Sidebar = React.lazy(() => import('../sidebar1/Sidebar'));
const Header = React.lazy(() => import('../header1/Header'));
function CreateCourse() {
  const {User} = useStoreState((state) => state);

  const {profile} = User;
  const [message, setMessage] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const own = profile.map((profil) => profil.teacher_email);
  const [teacher] = useState(own[0]);
  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/courses`, {
        method: 'GET',
      });

      const parseData = await res.json();

      setMessage(parseData.filter((fil) => fil.teacher_email === teacher));
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [setMessage]);

  return (
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
                  <caption>List of creation</caption>
                  <thead>
                    <tr>
                      <th scope='col'>Name</th>

                      <th scope='col'>Level</th>
                      <th scope='col'>Category</th>
                      <th scope='col'>duration</th>
                      <th scope='col'>type</th>
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
                                <Link to={`/one-course/${fil.course_name}`}>
                                  {fil.course_name}
                                </Link>
                              </td>

                              <td>{fil.course_level}</td>
                              <td>{fil.course_category}</td>
                              <td>{fil.course_duration}</td>
                              <td>{fil.course_type}</td>
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
  );
}

export default React.memo(CreateCourse);
