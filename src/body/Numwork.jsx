import {useStoreState} from 'easy-peasy';
import React, {useEffect, useState} from 'react';
import {url} from '../url';

function Numwork() {
  const {User} = useStoreState((state) => state);
  const {token} = useStoreState((state) => state.Auth);

  const {profile} = User;

  const [notes, setNote] = useState([]);

  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/work`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      setNote(
        parseData.filter((fil) => fil.class_year_content === id[0]).length,
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const id = profile.map((profil) => profil.class_student);

  return (
    <div className='col-md-6 mb-4 mb-lg-0 stretch-card transparent'>
      <div className='card card-light-blue'>
        <div className='card-body'>
          <p className='mb-4'>Number of Works</p>
          <p className='fs-30 mb-2'>{notes}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Numwork);
