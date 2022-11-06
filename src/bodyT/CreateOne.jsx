import React, {useState} from 'react';
import {toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import {url} from '../url';
import 'react-quill/dist/quill.snow.css';

import EditorToolBar, {modules, formats} from './EditorToolBar';
import { useStoreState } from 'easy-peasy';
import { useParams } from 'react-router-dom';
const Header = React.lazy(() => import('../header1/Header'));
const Sidebar = React.lazy(() => import('../sidebar1/Sidebar'));

function CreateOne() {
  const [inputs, setInputs] = useState({
    question: '',
    answer: '',
  });
const {id} = useParams()
  const {User} = useStoreState((state) => state);

  const {profile} = User;

  const own = profile.map((profil) => profil.teacher_email);
  const [teacher] = useState(own[0]);
  const name = id;
  const [choicese, setChoicese] = useState(null);
  const [choice, setChoice] = useState(null);
  const [choic, setChoic] = useState(null);
  const [choica, setChoica] = useState(null);
  const [content, setContent] = useState('');
  const [closure, setClosure] = useState('');

  const {question, answer} = inputs;
  const choices = [choicese, choice, choic, choica];

  const onChange = (e) =>
    setInputs({...inputs, [e.target.name]: e.target.value});
  const handleChange = (value) => {
    setContent(value);
  };

  const handlEhang = (value) => {
    setClosure(value);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        question,
        choices,
        answer,
        teacher,
        name,
      };
      const response = await fetch(`${url}/create/quiz`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
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

  const onSubmitFor = async (e) => {
    e.preventDefault();

    try {
      const body = {
        content,
        name,
        teacher,
      };
      const response = await fetch(`${url}/create/open`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {closure};
      const response = await fetch(`${url}/create/course/${name}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (response.status === 200) {
        toast.success('Sent Successfully');
      } else {
        toast.error('Fill the required one');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(closure);
  return (
    <div className='App'>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='content-wrapper aerq'>
          <div className='card'>
            <div className='row'>
              <div className='card-body'>
                <div className='ml-xl-4 mt-3'>
                  <form className='row g-3' onSubmit={onSubmit}>
                    <div className='col-md-6'>
                      <label forhtml='inputPassword4' className='form-label'>
                        Close the test no || yes
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        value={closure}
                        onChange={(e) => setClosure(e.target.value)}
                        name='question'
                        id='inputPassword4'
                      />
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

          <br />
          <br />
          <br />
          <div className='card'>
            <div className='row'>
              <div className='card-body'>
                <div className='ml-xl-4 mt-3'>
                  <form className='row g-3' onSubmit={onSubmitForm}>
                    <div className='col-md-6'>
                      <label forhtml='inputPassword4' className='form-label'>
                        Question
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        value={question}
                        onChange={(e) => onChange(e)}
                        name='question'
                        id='inputPassword4'
                      />
                    </div>
                    <div className='col-12'>
                      <label forhtml='inputAddress' className='form-label'>
                        Answer 1
                      </label>
                      <input
                        type='text'
                        onChange={(e) => setChoicese(e.target.value)}
                        className='form-control'
                        id='inputAddress'
                      />
                    </div>
                    <div className='col-12'>
                      <label forhtml='inputAddress2' className='form-label'>
                        Answer 2
                      </label>
                      <input
                        type='text'
                        onChange={(e) => setChoice(e.target.value)}
                        className='form-control'
                        id='inputAddress2'
                      />
                    </div>

                    <div className={'col-12'}>
                      <label forhtml='inputAddress' className='form-label'>
                        Answer 3
                      </label>
                      <input
                        type='text'
                        onChange={(e) => setChoic(e.target.value)}
                        className='form-control'
                        id='inputAddress'
                      />
                    </div>
                    <div className={'col-12'}>
                      <label forhtml='inputAddress2' className='form-label'>
                        Answer 4
                      </label>
                      <input
                        type='text'
                        onChange={(e) => setChoica(e.target.value)}
                        className='form-control'
                        id='inputAddress2'
                      />
                    </div>
                    <div className='col-md-6'>
                      <label forhtml='inputCity' className='form-label'>
                        Correct answer
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        value={answer}
                        onChange={(e) => onChange(e)}
                        name='answer'
                        id='inputCity'
                      />
                    </div>

                    <button className='btn m-4 btn-primary col-md-3 btn-icon-text'>
                      <i className='bi bi-upload   btn-icon-prepend'></i>
                      Submit
                    </button>
                  </form>
                </div>
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
                  <form className='row g-3' onSubmit={onSubmitFor}>
                    <div className='containe '>
                      <EditorToolBar toolbarId={'t1'} />
                      <ReactQuill
                        theme='snow'
                        value={content}
                        onChange={handleChange}
                        modules={modules('t1')}
                        formats={formats}
                      />
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
  );
}

export default React.memo(CreateOne);
