import React, {useState, useEffect, useRef} from 'react';

const Header = React.lazy(() => import('../../header/Header'));
const Sidebar = React.lazy(() => import('../../sidebar/Sidebar'));
function OneTest({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}) {
  const [counter, setCounter] = useState(120);
  const [selected, setSelected] = useState('');

  const [error, setError] = useState('');
  const radiosWrapper = useRef();
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  useEffect(() => {
    try {
      const findCheckedInput =
        radiosWrapper.current.querySelector('input:checked');
      if (findCheckedInput) {
        findCheckedInput.checked = false;
      }
    } catch (error) {
      console.error(error);
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError('');
    }
  };

  const nextClickHandler = (e) => {
    if (selected === '') {
      return setError('Please select one option!');
    }
    onAnswerUpdate((prevState) => [
      ...prevState,
      {q: data.Quiz_question, a: selected},
    ]);
    setSelected('');
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };

  return (
    <>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='container o content-wrapper'>
          <div id='game' className='justify-center flex-column'>
            <div id='hud'>
              <div id='hud-item'>
                <p id='progressText' className='hud-prefix'>
                  Question
                </p>
                <div id='progressBar'>
                  <div id='progressBarFull'></div>
                </div>
              </div>
              <div id='hud-item'>
                <p className='hud-prefix'>Time</p>
                <h1 className='hud-main-text' id='score'>
                  {counter === 0 ? 'over' : counter}
                </h1>
              </div>
            </div>
            <h2 id='question'>{data.quiz_question}</h2>
            {data.quiz_choice.map((choice, i) => (
              <div className='choice-container' key={i} ref={radiosWrapper}>
                <label className='radio has-background-light choice-text'>
                  <input
                    className='choice-prefix'
                    type='radio'
                    name='answer'
                    value={choice}
                    onChange={changeHandler}
                  />
                  {choice}
                </label>
              </div>
            ))}
            {error && <div className='has-text-danger'>{error}</div>}
            <button
              className={counter === 0 ? 'over' : 'btn btn-info '}
              onClick={nextClickHandler}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(OneTest);
