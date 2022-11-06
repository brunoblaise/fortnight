/** @format */

import {useStoreState} from 'easy-peasy';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
const Header = React.lazy(() => import('../header/Header'));
const Sidebar = React.lazy(() => import('../sidebar/Sidebar'));
import {format} from 'timeago.js';
import {url} from '../url';

const Submit = React.lazy(() => import('./Submit'));
function DownloadWork() {
  const {token} = useStoreState((state) => state.Auth);

  const {id} = useParams();
  const [notes, setNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/work/${id}`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      setNote(parseData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [setNote]);
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
                    <p className='msg-subject'>{notes.work_title}</p>
                  </div>

                  <div className='message-content'>
                    <p>Hi Students, instructions must be followed</p>

                    <p>{notes.work_note}</p>
                    <div class='attachments-sections'>
                      <ul>
                        <li>
                          {loading ? (
                            'loading..'
                          ) : (
                            <>
                              <div className='thumb'>
                                <i className='ti-file'></i>
                              </div>
                              <div className='details'>
                                <h6>Title</h6>
                                <p className='file-name'>{notes.work_title}</p>

                                <div className='buttons'>
                                  <a
                                    href={`${notes.work_url}`}
                                    target='_blank'
                                    className='view'>
                                    View
                                  </a>
                                </div>
                              </div>
                            </>
                          )}
                        </li>
                      </ul>
                    </div>
                    <Submit
                      course={notes.work_title}
                      teacher={notes.teacher_email}
                    />
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
export default React.memo(DownloadWork);
