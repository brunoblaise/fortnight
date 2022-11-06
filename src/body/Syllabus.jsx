import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import {url} from '../url';
import {useStoreState} from 'easy-peasy';

const Sidebar = React.lazy(() => import('../sidebar/Sidebar'));
const Header = React.lazy(() => import('../header/Header'));

function Syllabus() {
  const {User} = useStoreState((state) => state);

  const {profile} = User;

  const [notes, setNote] = useState([]);

  const [loading, setLoading] = useState(true);
  const id = profile.map((profil) => profil.class_student);
  const {token} = useStoreState((state) => state.Auth);

  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/syllabus`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      setNote(parseData.filter((fil) => fil.class_year_content === id[0]));
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(notes);
  return (
    <div className='App'>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='main-panel'>
          <div className='content-wrapper'>
            <div className='container overflow-hidden'>
              <div className='row g-2'>
                {loading ? (
                  <p>loading...</p>
                ) : (
                  notes.map((note) => (
                    <a
                      className='col-6'
                      target='_blank'
                      href={`${note.url_syllabus}`}>
                      <div className='p-3 border bg-light'>
                        {' '}
                        <img
                          src={`https://avatars.dicebear.com/api/initials/${note.titled_syl}.svg`}
                          alt='avatar'
                          width='100px'
                          height='100px'
                        />
                        <div>
                          <p>{note.titled_syl}</p>
                        </div>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Syllabus);
