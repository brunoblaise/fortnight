import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {url} from '../url';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import EditorToolBar, {modules, formats} from './EditorToolBar';
import {useStoreState} from 'easy-peasy';

function Submit({course, teacher}) {
  const {User} = useStoreState((state) => state);

  const {profile} = User;
  const own = profile.map((profil) => profil.student_email);

  const level1 = profile.map((profil) => profil.class_student);

  const [content, setContent] = useState('');
  const handleChange = (value) => {
    setContent(value);
  };

  const [name] = useState(own[0]);
  const [level] = useState(level1[0]);

  const onSubmitFor = async (e) => {
    e.preventDefault();

    try {
      const body = {
        course,
        content,
        teacher,
        name,
        level,
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
  console.log(level);
  return (
    <div className='content-wrapper aerq'>
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
  );
}

export default React.memo(Submit);
