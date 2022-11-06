import {useStoreState} from 'easy-peasy';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {url} from '../url';

function Submis() {
  const {User} = useStoreState((state) => state);

  const {profile} = User;

  const own = profile.map((profil) => profil.student_id);

  const id = own[0];

  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    gender: '',

    parent: '',

    age: '',
    phone: '',
    bio: '',
  });

  const {
    fname,
    lname,

    parent,

    gender,

    age,
    phone,
    bio,
  } = inputs;

  const onChange = (e) =>
    setInputs({...inputs, [e.target.name]: e.target.value});

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {fname, lname, parent, gender, age, phone, bio};
      const response = await fetch(`${url}/create/UpdateProfile/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (response.status === 500) {
        toast.error('Fill the required one');
      } else {
        toast.success('Sent Successfully');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='card'>
      <div className='row'>
        <div className='card-body'>
          <div className='ml-xl-4 mt-3'>
            <form className='row g-3' onSubmit={onSubmitForm}>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>First Name</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='ti-user text-primary'></i>
                      </span>
                    </div>
                    <input
                      type='text'
                      className='form-control form-control form-control-lg border-left-0'
                      name='fname'
                      value={fname}
                      placeholder='Username'
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Last Name</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='ti-email text-primary'></i>
                      </span>
                    </div>
                    <input
                      className='form-control form-control form-control-lg border-left-0'
                      type='text'
                      placeholder='last name'
                      name='lname'
                      value={lname}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>Gender</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='ti-lock text-primary'></i>
                      </span>
                    </div>
                    <input
                      className='form-control form-control form-control-lg border-left-0'
                      placeholder='gender'
                      type='text'
                      name='gender'
                      value={gender}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>Age</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='ti-lock text-primary'></i>
                      </span>
                    </div>
                    <input
                      className='form-control form-control form-control-lg border-left-0'
                      id='exampleInputPassword'
                      placeholder='age'
                      type='text'
                      name='age'
                      value={age}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Phone</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='ti-lock text-primary'></i>
                      </span>
                    </div>
                    <input
                      className='form-control form-control form-control-lg border-left-0'
                      value={phone}
                      name='phone'
                      placeholder='phone'
                      type='number'
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Biography</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='ti-lock text-primary'></i>
                      </span>
                    </div>
                    <textarea
                      className='form-control form-control form-control-lg border-left-0'
                      rows='4'
                      placeholder='Biography'
                      type='text'
                      name='bio'
                      value={bio}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className='mt-3'>
                  <button className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'>
                    <i className='bi bi-upload   btn-icon-prepend'></i>
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Submis);
