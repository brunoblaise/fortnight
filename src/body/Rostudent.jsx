import { useStoreState } from 'easy-peasy';
import React, {useEffect, useState} from 'react';
import {url} from '../url';

function Rostudent() {
  const [message, setMessage] = useState([]);
  const [search, setSearch] = useState('');

  const {User} = useStoreState((state) => state);
  
  const {token} = useStoreState((state) => state.Auth);

  const {profile} = User;
  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/Emailsel`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      setMessage(parseData.filter((fil) => fil.class_student === id[0]));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  const id = profile.map((profil) => profil.class_student);

  const hid = profile[0].hide;
  message.filter((el, index) => message.indexOf(el) === index);
  return (
    <div className='col-lg-12 grid-margin stretch-card'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title' _msthash='2271633' _msttexthash='226057'>
            Your classmates in {id}
          </h4>

          <div className='table-responsive pt-3'>
            <input
              type='search'
              className='form-control'
              placeholder='Search'
              aria-controls='order-listing'
              value={search}
              name='search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th _msthash='4713943' _msttexthash='135252'>
                    Class
                  </th>
                  <th _msthash='4715139' _msttexthash='117936'>
                    Email
                  </th>
                  <th _msthash='4715139' _msttexthash='117936'>
                    Photo
                  </th>
                  <th _msthash='4716335' _msttexthash='79274'>
                    Gender
                  </th>
                  <th _msthash='4717531' _msttexthash='109837'>
                    Phone
                  </th>
                </tr>
              </thead>
              {message
                .filter((val) => {
                  if (search === '') {
                    return val;
                  } else if (
                    val.student_email
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .slice(0, 15)
                .map((note) => (
                  <tbody key={note.student_email}>
                    <tr>
                      <td _msthash='4739384' _msttexthash='146692'>
                        {note.class_student}
                      </td>

                      <td _msthash='4741776' _msttexthash='38454'>
                        {note.student_email}
                      </td>
                      <td _msthash='4741776' _msttexthash='38454'>
                        <img src={note.student_photo} alt='' />
                      </td>
                      <td _msthash='4742972' _msttexthash='89830'>
                        {note.student_gender}
                      </td>
                      {
                        <td _msthash='4742972' _msttexthash='89830'>
                          {note.student_phonem}
                        </td>
                      }
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

export default React.memo(Rostudent);
