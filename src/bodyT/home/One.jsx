import React, {useState, useEffect} from 'react';
import Header from '../../header1/Header';
import Sidebar from '../../sidebar1/Sidebar';
import {url} from '../../url';
import {toast} from 'react-toastify';
import {useStoreState} from 'easy-peasy';
import {useParams} from 'react-router-dom';

function One() {
  const {token} = useStoreState((state) => state.Auth);
  const {id} = useParams();

  const [inputs, setInputs] = useState({
    marks: '',
    feedback: '',
  });
  const {feedback, marks} = inputs;
  const [message, setMessage] = useState([]);

  const onChange = (e) =>
    setInputs({...inputs, [e.target.name]: e.target.value});
  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/answers`, {
        method: 'GET',
      });

      const parseData = await res.json();

      setMessage(
        parseData.filter((fil) => fil.course_name === id),
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [setMessage]);
  const name = message.map((profil) => profil.course_name)[0];
  const student = message.map((profil) => profil.student_email)[0];
  const teacher = message.map((profil) => profil.teacher_email)[0];

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('jwt_token', token);

      const body = {marks, name, feedback, student, teacher};
      const response = await fetch(`${url}/create/marks`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        toast.success('Sent Successfully');
      } else {
        toast.error('Something is wrong');
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <div>
        <div className='App'>
          <Header />
          <div className='container-fluid page-body-wrapper'>
            <Sidebar />
            <div className='main-panel'>
              <div className='content-wrapper'>
                <div className='card'>
                  <div className='row'>
                    <div className='card-body'>
                      {message.map((fil) => (
                        <div
                          className='post__description'
                          dangerouslySetInnerHTML={{__html: fil.content}}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div className='card'>
                  <div className='row'>
                    <div className='card-body'>
                      <div className='ml-xl-4 mt-3'>
                        <form className='row g-3' onSubmit={onSubmitForm}>
                          <div className='containe '>
                            <div className='col-md-4'>
                              <label
                                forhtml='inputEmail4'
                                className='form-label'>
                                Marks
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='marks'
                                value={marks}
                                placeholder='student marks'
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                            <div className='col-md-6'>
                              <label
                                forhtml='inputEmail4'
                                className='form-label'>
                                Feedback
                              </label>
                              <textarea
                                type='text'
                                className='form-control form-control form-control-lg '
                                name='feedback'
                                value={feedback}
                                placeholder=' feedback summary'
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                          <button className='btn btn-primary btn-icon-text'>
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
        </div>
      </div>
    </div>
  );
}

export default React.memo(One);
