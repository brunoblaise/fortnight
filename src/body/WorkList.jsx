import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import {url} from '../url';
import {useStoreState} from 'easy-peasy';
function WorkList() {
  const {User} = useStoreState((state) => state);

  const {profile} = User;
  const {token} = useStoreState((state) => state.Auth);

  const [notes, setNote] = useState([]);
  const [search, setSearch] = useState('');
  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/work`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      setNote(parseData.filter((fil) => fil.class_year_content === id[0]));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const id = profile.map((profil) => profil.class_student);

  return (
    <>
      <div className='form-group'>
        <input
          className='form-control w-100'
          type='search'
          placeholder='Search work'
          value={search}
          name='search'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {notes
        .slice(0, 5)
        .filter((val) => {
          if (search === '') {
            return val;
          } else if (
            val.work_title.toLowerCase().includes(search.toLowerCase())
          ) {
            return val;
          }
        })
        .slice(0, 5)
        .map((note) => (
          <div key={note.work_id} className='list-group'>
            <Link
              className='list-group-item list-group-item-action'
              to={`/work/${note.work_id}`}>
              {note.work_title}
            </Link>
          </div>
        ))}
    </>
  );
}

export default React.memo(WorkList);
