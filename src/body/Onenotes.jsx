import {useStoreState} from 'easy-peasy';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {format} from 'timeago.js';
import {url} from '../url';

const Header = React.lazy(() => import('../header/Header'));

const Sidebar = React.lazy(() => import('../sidebar/Sidebar'));

function Onenotes() {
  const [notes, setNotes] = useState([]);
  const {id} = useParams();
  const {token} = useStoreState((state) => state.Auth);

  const getData = async () => {
    try {
      const res = await fetch(`${url}/get/notes/${id}`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      if (parseData) {
        setNotes(parseData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='content-wrapper'>
          <div className='email-wrapper wrapper'>
            <div className='row align-items-stretch'>
              <div className='mail-view d-none d-md-block col-md-9 col-lg-7 bg-white'>
                <div className='message-body'>
                  <div className='details'>
                    <p className='msg-subject'>{notes.notes_title}</p>
                  </div>

                  <div className='message-content'>
                    <p>Hi Students, instructions must be followed</p>

                    <p>{notes.short_note}</p>
                    <div className='attachments-sections'>
                      <ul>
                        <li>
                          <>
                            <div className='thumb'>
                              <i className='ti-file'></i>
                            </div>
                            <div className='details'>
                              <h6> notes title</h6>
                              <p className='file-name'>{notes.notes_title}</p>
                              <br />

                              <br />

                              <div className='buttons'>
                                <a
                                  href={`${notes.notes_url}`}
                                  target='_blank'
                                  className='view'>
                                  View
                                </a>
                              </div>
                            </div>
                          </>
                        </li>
                      </ul>
                    </div>

                    <p>
                      <br />
                      <br />
                      Regards,
                      <br />
                      {format(notes.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Onenotes);
