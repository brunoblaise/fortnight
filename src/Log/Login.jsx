import React, {useEffect, useState} from 'react';

import {Link, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Helmet} from 'react-helmet';
import {url} from '../url';

import {useStoreActions} from 'easy-peasy';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const {id} = useParams();
  const {setAuth, setToken} = useStoreActions((actions) => actions.Auth);
  const {setType} = useStoreActions((actions) => actions.Type);

  const {email, password} = inputs;

  const onChange = (e) =>
    setInputs({...inputs, [e.target.name]: e.target.value});

  const check =
    id === 'teacher'
      ? `${url}/create/loginT`
      : id === 'student'
      ? `${url}/create/logins`
      : `Nothing`;
  const who =
    id === 'teacher' ? '/dashboardT' : id === 'student' ? '/dashboard' : '';
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (inputs.email === '' || inputs.password === '') {
      toast.error('Please fill all the fields');
    } else {
      try {
        const body = {email, password};
        const response = await fetch(`${check}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const parseRes = await response.json();

        if (parseRes.jwtToken) {
          toast.success('Logged in Successfully');
          setToken(` ${parseRes.jwtToken}`);
          setAuth(true);
          setType(id);
          window.location.href = who;
        } else {
          setAuth(false);
          toast.error(parseRes);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
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

        <title>Login</title>
        <meta
          name='keywords'
          content='college du christ roi, nyanza, south province, rwanda, school, website'
        />
      </Helmet>
      <div className='container-fluid page-body-wrapper full-page-wrapper'>
        <div className='content-wrapper d-flex align-items-center auth px-0'>
          <div className='row w-100 mx-0'>
            <div className='col-lg-4 mx-auto'>
              <div className='auth-form-light text-left py-5 px-4 px-sm-5'>
                <h4>Hello! let's get started.</h4>

                <h6 className='font-weight-light'>Sign in to continue.</h6>
                <form className='pt-3' onSubmit={onSubmitForm}>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control form-control-lg'
                      id='exampleInputEmail1'
                      disabled={check === 'Nothing' ? true : false}
                      placeholder='Email'
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control form-control-lg'
                      id='exampleInputPassword1'
                      placeholder='Password'
                      name='password'
                      disabled={check === 'Nothing' ? true : false}
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className='mt-3'>
                    <button
                      disabled={check === 'Nothing' ? true : false}
                      className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'>
                      SIGN IN
                    </button>
                  </div>
                  <div className='text-center mt-4 font-weight-light'>
                    <br />

                    <Link to='/register' className='text-primary'>
                      Create an account
                    </Link>

                    <br />
                    <br />
                    <Link to='/forget' className='text-primary'>
                      forget password
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
};

export default React.memo(Login);
