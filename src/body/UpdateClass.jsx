import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {url} from '../url';
import {Helmet} from 'react-helmet';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { useStoreState } from 'easy-peasy';

function UpdateClass() {
  const {User} = useStoreState((state) => state);


  const {profile} = User;

  const own = profile.map((profil) => profil.student_id);

  const id = own[0];

  const [subjec, setSubjec] = useState('');

  const classe = subjec.value;

  const handleChang = (event) => {
    setSubjec({value: event.target.value});
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {classe};
      const response = await fetch(`${url}/create/UpdateClass/${id}`, {
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
    <div>
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

          <title>Update class</title>
        </Helmet>
        <Header />
        <div className='container-fluid page-body-wrapper'>
          <Sidebar />
          <div className='content-wrapper'>
            <div className='card'>
              <div className='row'>
                <div className='card-body'>
                  <div className='ml-xl-4 mt-3'>
                    <h4 className='card-title'>Update your class here </h4>
                    <div className='template-demo'>
                      <p className='card-description'>
                        here you will update your class with the button upload
                      </p>
                    </div>

                    <form
                      className='row g-3 sendNewMessage'
                      onSubmit={onSubmitForm}>
                      <div className='col-md-6'>
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
                      <button className='btnSendMsg' id='sendMsgBtn'>
                        <i className='fa fa-paper-plane'></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UpdateClass);
