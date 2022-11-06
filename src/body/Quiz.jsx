import React from 'react';

const Header = React.lazy(() => import('../header/Header'));
const WorkList = React.lazy(() => import('./WorkList'));
const Sidebar = React.lazy(() => import('../sidebar/Sidebar'));
function Quiz() {
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
                  <div className='sender-details'>
                    <div className='details'>
                   
                    <p>How to view work given</p>
                    </div>
                  </div>
                  <div className='message-content'>
                  <p>Hi Students,</p>
                  <p className='msg-subject'>
                        Here you will find all the work you have been given 
                      </p>
                  <WorkList />
                 
                      
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

export default React.memo(Quiz);
