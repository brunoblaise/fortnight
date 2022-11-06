/** @format */

import React, {useEffect, Suspense, useState, useRef} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Render = React.lazy(() => import('./renders/Render'));
const Login = React.lazy(() => import('./Log/Login'));
const Profile = React.lazy(() => import('./body/Profile'));
const Register = React.lazy(() => import('./body/Register'));
const RenderT = React.lazy(() => import('./renders1/RenderT'));

const ProfileT = React.lazy(() => import('./bodyT/ProfileT'));
const RegisterT = React.lazy(() => import('./bodyT/RegisterT'));
const Notes = React.lazy(() => import('./body/Notes'));

import songsdata from './audio';

const Quiz = React.lazy(() => import('./body/Quiz'));
const Player = React.lazy(() => import('./Player'));

import {v4 as uuidV4} from 'uuid';
import './App.css';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

const Library = React.lazy(() => import('./body/Library'));
const LibraryT = React.lazy(() => import('./bodyT/LibraryT'));
const DownloadWork = React.lazy(() => import('./body/DownloadWork'));
const Resource = React.lazy(() => import('./body/Resource'));

const VideoCall = React.lazy(() => import('./page/Meeting'));
const JoinMeeting = React.lazy(() => import('./page/Join'));
const Message = React.lazy(() => import('./body/Message'));
const MessageT = React.lazy(() => import('./bodyT/MessageT'));
const Onenotes = React.lazy(() => import('./body/Onenotes'));

const Report = React.lazy(() => import('./body/Report'));

import {url} from './url';
import {ErrorBoundary} from 'react-error-boundary';
import PrivateRoutes from './utils/protected/PrivateRoutes';

const Nomatch = React.lazy(() => import('./Nomatch'));

import {useStoreActions, useStoreState} from 'easy-peasy';

const Written = React.lazy(() => import('./body/Written'));
const Submitted = React.lazy(() => import('./bodyT/home/Submitted'));

const One = React.lazy(() => import('./bodyT/home/One'));

const CreateOne = React.lazy(() => import('./bodyT/CreateOne'));
const CreateCourse = React.lazy(() => import('./bodyT/CreateCourse'));
const Onemessage = React.lazy(() => import('./bodyT/Onemessage'));

const UpdateClass = React.lazy(() => import('./body/UpdateClass'));

const SyllabusT = React.lazy(() => import('./bodyT/home/SyllabusT'));
const Syllabus = React.lazy(() => import('./body/Syllabus'));

const Fallback = React.lazy(() => import('./Fallback'));

const ForgetT = React.lazy(() => import('./res/ForgetT'));
const ResetT = React.lazy(() => import('./res/ResetT'));
const Forget = React.lazy(() => import('./res/Forget'));
const Reset = React.lazy(() => import('./res/Reset'));

const CreateTest = React.lazy(() => import('./bodyT/CreateTest'));
const Screen = React.lazy(() => import('./body/quiz/Screen'));
const Type = React.lazy(() => import('./body/Type'));
const Rostudent = React.lazy(() => import('./body/Rostudent'));
const TestRoom = React.lazy(() => import('./body/TestRoom'));

const Rooms = React.lazy(() => import('./bodyT/Rooms'));
const Texteditor = React.lazy(() => import('./texteditor/Texteditor'));
const NotesT = React.lazy(() => import('./bodyT/NotesT'));
const ReportT = React.lazy(() => import('./bodyT/ReportT'));
const WorkSubT = React.lazy(() => import('./bodyT/WorkSubT'));

function App() {
  const {token} = useStoreState((state) => state.Auth);
  const {type} = useStoreState((state) => state.Type);
  const {profile} = useStoreState((state) => state.User);

  const {setProfile} = useStoreActions((state) => state.User);
  let controller = new AbortController();

  const {setToken, setAuth} = useStoreActions((state) => state.Auth);
  const {setType} = useStoreActions((state) => state.Type);
  const errorHandle = (error, errorInfo) => {
    console.log('logging', error, errorInfo);
  };

  const fetchUrl = async () => {
    try {
      const res = await fetch(`${url}/create/verify`, {
        method: 'POST',
        headers: {
          jwt_token: `${token}`,
        },
      });
      const parseRes = await res.json();

      if (parseRes === true) {
        setAuth(true);
      } else if (parseRes === false) {
        setProfile([]);
        setToken('');
        setAuth(false);
        setType('');
      } else if (profile.length === 0) {
        setProfile([]);
        setToken('');
        setAuth(false);
        setType('');
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const check =
    type === 'teacher'
      ? `${url}/get/teacher`
      : type === 'student'
      ? `${url}/get/profile`
      : '';
  const getProfile = async () => {
    try {
      const res = await fetch(`${check}`, {
        method: 'GET',
        headers: {jwt_token: token},
      });

      const parseData = await res.json();

      if (parseData) {
        setProfile(parseData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUrl();
    getProfile();

    return () => controller?.abort();
  }, []);

  const location = useLocation();
  if (location.pathname === '/') {
    return window.location.assign('https://www.lyceedekigali.ac.rw/');
  }

  const [songs, setSongs] = useState(songsdata);

  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[1]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
  }, [isplaying]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  return (
    <Suspense
      fallback={
        <p className='fall'>loading the application please hold on... </p>
      }>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandle}>
        <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
        <Player
          songs={songs}
          setSongs={setSongs}
          isplaying={isplaying}
          setisplaying={setisplaying}
          audioElem={audioElem}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
        <Routes>
          <Route path='/:id/login' element={<Login />} />

          <Route path='/forget' render={<Forget />} />

          <Route path='/forget/:id/:token' element={<Reset />} />
          <Route path='/forgetT' render={<ForgetT />} />

          <Route path='/registerT' element={<RegisterT />} />

          <Route path='/forgetT/:id/:token' element={<ResetT />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/lab' element={<Resource />} />
            <Route path='/meet' element={<JoinMeeting />} />
            <Route path='/video/:id' element={<VideoCall />} />
            <Route
              path='/text'
              element={<Navigate to={`/text/documents/${uuidV4()}`} />}
            />

            <Route path='/text/documents/:id' element={<Texteditor />} />

            <Route path='/dashboard' element={<Render />} />

            <Route path='/UpdateClass' element={<UpdateClass />} />

            <Route path='/profile' element={<Profile />} />

            <Route path='/notes' element={<Notes />} />

            <Route path='/syllabus' element={<Syllabus />} />
            <Route path='/room/student' element={<Rostudent />} />
            <Route path='/works' element={<Quiz />} />

            <Route path='/library' element={<Library />} />
            <Route path='/room/test' element={<TestRoom />} />
            <Route path='/room/test/:id' element={<Type />} />

            <Route path='/message/' element={<Message />} />

            <Route path='/notes/:id' element={<Onenotes />} />

            <Route path='/work/:id' element={<DownloadWork />} />

            <Route path='/room/quiz/:id' element={<Screen />} />

            <Route path='/open/question/:id' element={<Written />} />

            <Route path='/report' element={<Report />} />

            <Route path='/dashboardT' element={<RenderT />} />

            <Route path='/create/room/Create' element={<CreateTest />} />

            <Route path='/create/room/Created' element={<CreateCourse />} />

            <Route path='/one-course/:id' element={<CreateOne />} />
            <Route path='/course/:id' element={<One />} />

            <Route path='/Syllabust' element={<SyllabusT />} />

            <Route path='/Teacher' element={<ProfileT />} />

            <Route path='/libraryT' element={<LibraryT />} />

            <Route path='/messageT' element={<MessageT />} />
            <Route path='/messageT/:id' element={<Onemessage />} />
            <Route path='/notesT' element={<NotesT />} />

            <Route path='/reportT' element={<ReportT />} />
            <Route path='/worksT' element={<WorkSubT />} />

            <Route path='/class' element={<Rooms />} />

            <Route path='/class/room/:id' element={<Submitted />} />
          </Route>

          <Route path='*' element={<Nomatch />} />
        </Routes>

        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          draggable
          pauseOnHover
          theme='dark'
        />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
