import React, {useEffect, useState} from 'react';

import {format} from 'timeago.js';
import {url} from '../url';
import {useStoreState} from 'easy-peasy';
function Iframe(props) {
  return (
    <div dangerouslySetInnerHTML={{__html: props.iframe ? props.iframe : ''}} />
  );
}
function ReportOne() {
  const [notes, setNote] = useState([]);
  const {User} = useStoreState((state) => state);
  const {token} = useStoreState((state) => state.Auth);

  const {profile} = User;

  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/report`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      setNote(parseData.filter((fil) => fil.student_email === id[0]));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [setNote]);
  const id = profile.map((profil) => profil.student_email);

  return (
    <>
      {notes.map((note) => (
        <div
          key={id[0]}
          className={
            format(note.timestamp) === '1 year ago' ? 'hide' : 'content-wrapper'
          }>
          <div className='email-wrapper wrapper'>
            <div className='row align-items-stretch'>
              <div className='mail-view d-none d-md-block col-md-9 col-lg-7 bg-white'>
                <div className='message-body'>
                  <div className='sender-details'>
                    <div className='details'>
                      <p className='msg-subject'>{notes.notes_title}</p>
                    </div>
                  </div>
                  <div className='message-content'>
                    <p>Hi Students,</p>
                    <p>your report card is here:</p>

                    <Iframe
                      iframe={`<iframe width="100%" height="266" s frameborder="no"  src='${note.report_url}'></iframe>`}
                    />
                    <p>
                      <br />
                      <br />
                      Regards,
                      <br />
                      {format(note.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default React.memo(ReportOne);
