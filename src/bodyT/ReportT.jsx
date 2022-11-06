import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {url} from '../url';
import {Helmet} from 'react-helmet';
import {useStoreState} from 'easy-peasy';
const Around = React.lazy(() => import('./home/Around'));

function ReportT() {
  const {token} = useStoreState((state) => state.Auth);


  const [recfile, setRecfile] = useState('');
  const [name, setName] = useState('');
  const [opene, setOpene] = useState(false);
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('recfile', recfile);
      formData.append('name', name);
      const myHeaders = new Headers();
      myHeaders.append('jwt_token', token);
      const response = await fetch(
        `${url}/create/report`,

        {
          method: 'POST',
          body: formData,
          headers: myHeaders,
        },
      );
      setOpene(true);
      if (response.status === 500) {
        toast.error('Something is wrong');
      } else {
        toast.success('Sent Successfully');
        setOpene(false);
      }
    } catch (err) {
      console.error(err.message);
    }
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

        <title>Report</title>
      </Helmet>
      <div className='card'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card-body'>
              <h4 className='card-title'>Submit Student Report here </h4>
              <div className='template-demo'>
                <p className='card-description'>
                  here you will submit Student Report with the button upload
                </p>
              </div>

              <form className='row g-3' onSubmit={onSubmitForm}>
                <input
                  name='recfile'
                  placeholder='Upload File'
                  type='file'
                  className='form-control form-control form-control-lg '
                  id='exampleInputPassword'
                  onChange={(e) => setRecfile(e.target.files[0])}
                />
                <input
                  type='text'
                  className='form-control form-control form-control-lg '
                  placeholder='Student Email'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  disabled={opene}
                  className='btn btn-primary btn-icon-text'>
                  <i className='bi bi-upload ti-file menu-icon btn-icon-prepend'></i>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <Around />
      </div>
    </div>
  );
}

export default React.memo(ReportT);
