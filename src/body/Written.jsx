import React, {useEffect, useState} from 'react';
const Sidebar = React.lazy(() => import('../sidebar/Sidebar'));
const Header = React.lazy(() => import('../header/Header'));
import {toast} from 'react-toastify';
import {url} from '../url';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import EditorToolBar, {modules, formats} from './EditorToolBar';
import {useStoreState} from 'easy-peasy';
import { useParams } from 'react-router-dom';

function Written() {
  const {User} = useStoreState((state) => state);

  const {profile} = User;

  
  const {id} = useParams()
  const idle = profile.map((profil) => profil.student_email)[0];
  const level = profile.map((profil) => profil.class_student)[0];

  const [messag, setMessag] = useState([]);
  const [course] = id;
  const name = idle;
  const [content, setContent] = useState('');
  const handleChange = (value) => {
    setContent(value);
  };

  const getProfil = async () => {
    try {
      const res = await fetch(`${url}/get/open`, {
        method: 'GET',
      });

      const parseData = await res.json();

      setMessag(parseData.filter((fil) => fil.course_name === id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfil();
  }, [setMessag]);

  const teacher = messag.map((profil) => profil.teacher_email)[0];
  const onSubmitFor = async (e) => {
    e.preventDefault();

    try {
      const body = {
        course,
        level,
        content,
        name,
        teacher,
      };
      const response = await fetch(`${url}/create/answers`, {
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
  
  return (
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
                    {messag.map((fil) => (
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
      </div>
    </div>
  );
}

export default React.memo(Written);
