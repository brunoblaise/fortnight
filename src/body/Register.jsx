import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {url} from '../url';
import {Helmet} from 'react-helmet';
import { useStoreActions } from 'easy-peasy';
function Register() {
  const {setAuth, setToken} = useStoreActions((actions) => actions.Auth);
  const {setType} = useStoreActions((actions) => actions.Type);
  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    gender: '',
    type: 'main',
    hide: '',
    parent: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    bio: '',
  });
  const [subjec, setSubjec] = useState('');
  const classe = subjec.value;

  const [photo, setPhoto] = useState('');
  const {
    fname,
    lname,
    type,
    hide,
    parent,

    gender,
    email,
    password,
    age,
    phone,
    bio,
  } = inputs;
  const [open, setOpen] = useState(false);
  const onChange = (e) =>
    setInputs({...inputs, [e.target.name]: e.target.value});

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('classe', classe);
      formData.append('fname', fname);
      formData.append('lname', lname);
      formData.append('gender', gender);
      formData.append('type', type);
      formData.append('parent', parent);
      formData.append('hide', hide);

      formData.append('email', email);
      formData.append('password', password);
      formData.append('photo', photo);
      formData.append('age', age);
      formData.append('phone', phone);
      formData.append('bio', bio);

      const response = await fetch(
        `${url}/create/registerS`,

        {
          method: 'POST',
          body: formData,
        },
      );

      const parseRes = await response.json();
      setOpen(true);
      if (parseRes.jwtToken) {
        toast.success('Logged in Successfully');
        setToken(` ${parseRes.jwtToken}`);
        setAuth(true);
        setType('student');
        window.location.href = '/dashboard';
      } else {
        setAuth(false);
        toast.error(parseRes);
      setOpen(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleChang = (event) => {
    setSubjec({value: event.target.value});
  };

  return (
    <div className='container-scroller'>
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

        <title>register</title>
      </Helmet>
      <div className='container-fluid page-body-wrapper full-page-wrapper'>
        <div className='content-wrapper d-flex align-items-stretch auth auth-img-bg'>
          <div className='row flex-grow'>
            <div className='col-lg-6 d-flex align-items-center justify-content-center'>
              <div className='auth-form-transparent text-left p-3'>
                <h4>New here?</h4>
                <h6 className='font-weight-light'>
                  Join us today! It takes only few steps
                </h6>
                <form className='pt-3' onSubmit={onSubmitForm}>
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
                    <label>Email</label>
                    <div className='input-group'>
                      <div className='input-group-prepend bg-transparent'>
                        <span className='input-group-text bg-transparent border-right-0'>
                          <i className='ti-lock text-primary'></i>
                        </span>
                      </div>
                      <input
                        className='form-control form-control form-control-lg border-left-0'
                        id='exampleInputPassword'
                        placeholder='email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <label forhtml='inputEmail4' className='form-label'>
                      class
                    </label>
                    <select
                      onChange={handleChang}
                      id='inputState'
                      className='form-select'>
                      <option>Select your class</option>
                      <option value='s1'>s1</option>
                      <option value='s2'>s2</option>
                      <option value='s3'>s3</option>
                      <option value='s4mcb'>s4mcb</option>
                      <option value='s4lkk'>s4lkk</option>
                      <option value='s4pcb'>s4pcb</option>
                      <option value='s5mcb'>s5mcb</option>
                      <option value='s5pcb'>s5pcb</option>
                      <option value='s5lkk'>s5lkk</option>
                      <option value='s6mcb'>s6mcb</option>
                      <option value='s6pcb'>s6pcb</option>
                      <option value='s6lkk'>s6lkk</option>
                    </select>
                  </div>

                  <div className='form-group'>
                    <label>Password</label>
                    <div className='input-group'>
                      <div className='input-group-prepend bg-transparent'>
                        <span className='input-group-text bg-transparent border-right-0'>
                          <i className='ti-lock text-primary'></i>
                        </span>
                      </div>
                      <input
                        className='form-control form-control form-control-lg border-left-0'
                        id='exampleInputPassword'
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Photo</label>
                    <div className='input-group'>
                      <div className='input-group-prepend bg-transparent'>
                        <span className='input-group-text bg-transparent border-right-0'>
                          <i className='ti-lock text-primary'></i>
                        </span>
                      </div>
                      <input
                        className='form-control form-control form-control-lg border-left-0'
                        id='exampleInputPassword'
                        placeholder='Photo'
                        type='file'
                        name='photo'
                        onChange={(e) => setPhoto(e.target.files[0])}
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
                    <label>Hide your contacts no || yes </label>
                    <div className='input-group'>
                      <div className='input-group-prepend bg-transparent'>
                        <span className='input-group-text bg-transparent border-right-0'>
                          <i className='ti-lock text-primary'></i>
                        </span>
                      </div>
                      <input
                        className='form-control form-control form-control-lg border-left-0'
                        value={hide}
                        name='hide'
                        placeholder='hide'
                        type='text'
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <label>Parent name</label>
                    <div className='input-group'>
                      <div className='input-group-prepend bg-transparent'>
                        <span className='input-group-text bg-transparent border-right-0'>
                          <i className='ti-user text-primary'></i>
                        </span>
                      </div>
                      <input
                        type='text'
                        className='form-control form-control form-control-lg border-left-0'
                        name='parent'
                        value={parent}
                        placeholder='Username'
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
                    <button
                    
                      className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'>
                      SIGN UP
                    </button>
                  </div>
                  <div className='text-center mt-4 font-weight-light'>
                    Already have an account?{' '}
                    <Link to='/' className='text-primary'>
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Register);
