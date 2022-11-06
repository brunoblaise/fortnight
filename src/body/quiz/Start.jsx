import React from 'react';
const Header = React.lazy(() => import('../../header/Header'));
const Sidebar = React.lazy(() => import('../../sidebar/Sidebar'));
const Start = ({onQuizStart, data, course}) => {
 
  return (
    <>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='content-wrapper'>
          <div className='cardo'>
            <div className='card-content'>
              <div className='content'>
                <h1>Start the Test</h1>
                {data.length === 0 || course[0].course_course === 'yes' ? (
                  <p>loading questions</p>
                ) : (
                  <p> Good luck!</p>
                )}

                <button
                  className={
                    data.length === 0 || course[0].course_course === 'yes'
                      ? 'hide'
                      : 'button is-info is-medium'
                  }
                  onClick={onQuizStart}>
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Start);
