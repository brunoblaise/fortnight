import {useStoreState} from 'easy-peasy';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {url} from '../../url';

const OneTest = React.lazy(() => import('./OneTest'));
const Start = React.lazy(() => import('./Start'));
const End = React.lazy(() => import('./End'));
function Screen() {
  const {token} = useStoreState((state) => state.Auth);
  const [setLoading] = useState(true);
  const {id} = useParams();
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [mes, setMes] = useState('');
  const [answers, setAnswers] = useState([]);
  const [notes, setNote] = useState([]);

  let controller = new AbortController();
  const getProfile = async () => {
    try {
      const res = await fetch(`${url}/get/quiz`, {
        method: 'GET',
        headers: {jwt_token: token},
        signal: controller.signal,
      });

      const parseData = await res.json();

      setNote(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const quizStartHandler = () => {
    setStep(2);
  };

  useEffect(() => {
    getProfile();
    return () => controller?.abort();
  }, []);

  const getPro = async () => {
    try {
      const res = await fetch(`${url}/get/courses`, {
        method: 'GET',
      });

      const parseData = await res.json();

      setMes(parseData.filter((fil) => fil.course_name === id));
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPro();
  }, [setMes]);

  return (
    <div>
      {step === 1 && (
        <Start onQuizStart={quizStartHandler} data={notes} course={mes} />
      )}
      {step === 2 && (
        <OneTest
          data={notes[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={notes.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )}
      {step === 3 && (
        <End
          results={answers}
          data={notes}
          nameu={id}
          datas={notes[activeQuestion]}
        />
      )}
    </div>
  );
}

export default React.memo(Screen);
