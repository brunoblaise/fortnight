import React from 'react';
import {Link} from 'react-router-dom';
const Header = React.lazy(() => import('../header/Header'));
const Sidebar = React.lazy(() => import('../sidebar/Sidebar'));
function TestRoom() {
  return (
    <div className='App'>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />

        <div className='content-wrapper'>
          <h1>Test for Today</h1>

          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/mathematics' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Mathematics</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/english' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>English</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/entrepreneurship' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>
                  Entrepreneurship
                </div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/chemistry' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Chemistry</div>
              </h2>
            </Link>
          </div>

          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/history' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>History</div>
              </h2>
            </Link>
          </div>

          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/physics' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Physics</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/ict' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Ict</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/biology' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Biology</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/literature' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Literature</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/religion' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Religion</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/kinyarwanda' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Kinyarwanda</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/french' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>French</div>
              </h2>
            </Link>
          </div>

          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/music' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Music</div>
              </h2>
            </Link>
          </div>
          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/kiswahili' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Kiswahili</div>
              </h2>
            </Link>
          </div>

          <div className='accordion accordion-flush' id='accordionFlushExample'>
            <Link to='/room/test/kiswahili' className='accordion-item'>
              <h2 className='accordion-header'>
                <div className='accordion-button collapsed'>Geography</div>
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TestRoom);
