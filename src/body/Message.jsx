import React, {useEffect, useState} from 'react';
const Messageform = React.lazy(() => import('./Messageform'));

import {format} from 'timeago.js';
import io from 'socket.io-client';
import {Helmet} from 'react-helmet';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {url} from '../url';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useStoreState} from 'easy-peasy';
function Message() {
  const [message, setMessage] = useState([]);

  const {token} = useStoreState((state) => state.Auth);


  const {User} = useStoreState((state) => state);

  const {profile} = User;

  const id = profile.map((profil) => profil.class_student);

  const own = profile.map((profil) => profil.student_email);

  const socket = io.connect(url);

  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/message`, {
        method: 'GET',
        headers: {jwt_token: token},
        
      });

      const parseData = await res.json();

      setMessage(parseData.filter((fil) => fil.level === id[0]));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    socket.on('messages', (data) => {
      setMessage((list) => [...list, data]);
    });
  });

  return (
    <>
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

        <title>Message</title>
      </Helmet>
      <div className='__main'>
        <div className='nav'>
          <div className='nav__blocks'></div>
          <div className='nav__blocks'></div>
          <div className='nav__blocks'></div>
        </div>
        <div className='main__chatbody'>
          <div className='main__chatcontent'>
            <div className='content__header'>
              <div className='blocks'>
                <div className='current-chatting-user'>
                  <div className='avatar'>
                    <div className='avatar-img'>
                      <LazyLoadImage
                        effect='blur'
                        width='640'
                        height='360'
                        src={`https://avatars.dicebear.com/api/avataaars/${own[0]}.svg`}
                        alt=''
                      />
                    </div>
                    <span className='isOnline active'></span>
                  </div>
                  <p>Ldk Chat Box</p>
                </div>
              </div>
            </div>
            <div className='content__body'>
              <div className='chat__items'>
                {message.map((chat) => (
                  <div
                    key={chat.id}
                    className={
                      chat.email === own[0]
                        ? 'chat__item me'
                        : 'chat__item other'
                    }
                    style={{animationDelay: '0.8s'}}>
                    <div className='chat__item__content'>
                      <div className='chat__msg'>{chat.content}</div>

                      <div className='chat__meta'>
                        <span>{chat.email}</span>
                        <span>{format(chat.send_time)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                

                <div></div>
              </div>
            </div>
            <div className='content__footer'>
              <Messageform classe={id[0]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Message);
