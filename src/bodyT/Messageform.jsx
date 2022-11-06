import {useStoreState} from 'easy-peasy';
import React, {useState} from 'react';
import io from 'socket.io-client';
import {url} from '../url';

function Messageform({classe}) {
  const {User} = useStoreState((state) => state);


  const {profile} = User;

  const own = profile.map((profil) => profil.teacher_email);

  const [message, setMessage] = useState('');
  const [name] = useState(own[0]);
  const sendMessage = async () => {
    try {
      const socket = io.connect(url);
      let payload = {
        content: message,
        level: classe,
        email: name,
      };

      await socket.emit('sendMessage', payload);
      console.log(payload);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='sendNewMessage'>
      <textarea
        className='messageInput textarea'
        type='text'
        placeholder='Type a message here'
        name='message'
        value={message}

        onChange={(e) => setMessage(e.target.value)}
      />
      <button className='btnSendMsg' onClick={sendMessage} id='sendMsgBtn'>
        <i className='fa fa-paper-plane'></i>
      </button>
    </div>
  );
}
export default React.memo(Messageform);
