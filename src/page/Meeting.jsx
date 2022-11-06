import React, {useEffect} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
function Video({match}) {
  const id = match.params.id;

  useEffect(() => {
    const domain = 'https://brunoblaise.daily.co/';
    axios
      .get(`https://serene-tor-16642.herokuapp.com/video-call/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const script = document.createElement('script');
          script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;

          document.body.appendChild(script);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <div> <Helmet>
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

  <title>{id}</title>
  <script crossorigin src="https://unpkg.com/@daily-co/daily-js" defer></script>

</Helmet></div>;
}
export default React.memo(Video);
