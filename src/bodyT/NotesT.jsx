import React, {useEffect, useState} from 'react';

import {toast} from 'react-toastify';

import {url} from '../url';
import {Helmet} from 'react-helmet';
import { useStoreState } from 'easy-peasy';
const Sidebar = React.lazy(() => import('../sidebar1/Sidebar'));
const Header = React.lazy(() => import('../header1/Header'));
function NotesT() {
      const [classer, setClass] = useState([])
    const fetchClass = async () => {
    try {
      const res = await fetch(`${url}/get/className`, {
        method: 'GET',
      });

      const parseData = await res.json();

      setClass(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=>{
    fetchClass()
  }, [])
  const {token} = useStoreState((state) => state.Auth);

  const {User} = useStoreState((state) => state);


  const {profile} = User;

  const own = profile.map((profil) => profil.teacher_email);

  const [name] = useState(own[0]);
  const [inputs, setInputs] = useState({
    title: '',
    email: name,
    summary: '',
  });

  const [recfile, setRecfile] = useState('');
  const [subjec, setSubjec] = useState('');

  const classe = subjec.value;
  const {title, email, summary} = inputs;
  const [opene, setOpene] = useState(false);

  const onChange = (e) =>
    setInputs({...inputs, [e.target.name]: e.target.value});

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('recfile', recfile);
      formData.append('classe', classe);
      formData.append('title', title);
      formData.append('summary', summary);

      formData.append('email', email);
      const myHeaders = new Headers();
      myHeaders.append('jwt_token', token);
      const response = await fetch(
        `${url}/create/notes`,

        {
          method: 'POST',
          body: formData,
          headers: myHeaders,
        },
      );
      setOpene(true);
      if (response.status === 500) {
        toast.error('Fill the required one');
      } else {
        toast.success('Sent Successfully');
        setOpene(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleChang = (event) => {
    setSubjec({value: event.target.value});
  };

  return (
    <div className='col-12 grid-margin'>
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

        <title>Notes</title>
      </Helmet>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='content-wrapper aerq'>
          <div className='card'>
            <div className='row'>
              <div className='card-body'>
                <div className='ml-xl-4 mt-3'>
                  <h4 className='card-title'>Submit your notes here </h4>
                  <div className='template-demo'>
                    <p className='card-description'>
                      here you will submit you work with the button upload
                    </p>
                  </div>

                  <form className='row g-3' onSubmit={onSubmitForm}>
                    <div className='col-md-6'>
                      <label forhtml='inputEmail4' className='form-label'>
                        class
                      </label>
                      <select
                        onChange={handleChang}
                        id='inputState'
                        className='form-select'>
                        <option>Select your class</option>
                        {classer.map((data) => (
                         <option key={data.name_id}>{data.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className='col-md-4'>
                      <label forhtml='inputEmail4' className='form-label'>
                        Notes title
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={title}
                        placeholder='title'
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label forhtml='inputEmail4' className='form-label'>
                        Instruction
                      </label>
                      <textarea
                        type='text'
                        className='form-control form-control form-control-lg '
                        name='summary'
                        value={summary}
                        placeholder='summary'
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='col-md-4'>
                      <label forhtml='inputEmail4' className='form-label'>
                        Upload a file
                      </label>
                      <input
                        name='recfile'
                        placeholder='Upload File'
                        type='file'
                        className='form-control form-control form-control-lg '
                        id='exampleInputPassword'
                        onChange={(e) => setRecfile(e.target.files[0])}
                      />
                    </div>

                    <button
                      disabled={opene}
                      className='btn m-4 btn-primary col-md-3 btn-icon-text'>
                      <i className='bi bi-upload ti-file menu-icon btn-icon-prepend'></i>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NotesT);
