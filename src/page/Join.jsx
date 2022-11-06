import React, {useState} from 'react';
import {Helmet} from "react-helmet";
function JoinRoom() {
  const [room, setRoom] = useState(null);

  const onSubmit = () => {
    window.location.assign(`/video/${room}`);
  };
  return (
    <div className='main-panel otr'>
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
        <script crossorigin src="https://unpkg.com/@daily-co/daily-js" defer></script>

        <title>{room}</title>
      </Helmet>
      <p>Join any  meeting</p>
      <div class='input-group input-group-sm mb-3'>
        <span class='input-group-text' id='inputGroup-sizing-sm'>
          Meet name
        </span>
        <input
          type='text'
          class='form-control'
          aria-label='Sizing example input'
          aria-describedby='inputGroup-sizing-sm'
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <button onClick={onSubmit} class='btn btn-outline-success'>
        Submit
      </button>
    </div>
  );
}

export default React.memo(JoinRoom);
