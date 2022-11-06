import React from 'react';
import {Link} from 'react-router-dom';

const Header = React.lazy(() => import('../header1/Header'));
const Sidebar = React.lazy(() => import('../sidebar1/Sidebar'));
function Rooms() {
  return (
    <div className='App'>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='main-panel'>
          <div className='content-wrapper'>
            <div className='row'>
              <div className='col-md-12 grid-margin stretch-card'>
                <div className='card position-relative'>
                  <div className='card-body'>
                    <Link to='/class/room/s1' className='row'>
                      <div className='col-md-12 col-xl-3 d-flex flex-column justify-content-start'>
                        <div className='ml-xl-4 mt-3'>
                          <i className='bi bi-lightbulb-fill menu-icon'></i>
                          <br />
                          <br />
                          <br />
                          <p className='card-title'>Class room</p>
                          <p className='mb-2 mb-xl-0'>Senior 1</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to='/class/room/s2' className='row'>
              <div className='col-md-12 grid-margin stretch-card'>
                <div className='card position-relative'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-12 col-xl-3 d-flex flex-column justify-content-start'>
                        <div className='ml-xl-4 mt-3'>
                          <i className='bi bi-lightbulb-fill menu-icon'></i>
                          <br />

                          <br />
                          <p className='card-title'>Class room</p>
                          <p className='mb-2 mb-xl-0'>Senior 2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to='/class/room/s3' className='row'>
              <div className='col-md-12 grid-margin stretch-card'>
                <div className='card position-relative'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-12 col-xl-3 d-flex flex-column justify-content-start'>
                        <div className='ml-xl-4 mt-3'>
                          <i className='bi bi-lightbulb-fill menu-icon'></i>
                          <br />
                          <br />
                          <br />
                          <p className='card-title'>Class room</p>
                          <p className='mb-2 mb-xl-0'>Senior 3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className='row'>
              <div className='col-md-12 grid-margin stretch-card'>
                <div className='card position-relative'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-12 col-xl-3 d-flex flex-column justify-content-start'>
                        <div className='ml-xl-4 mt-3'>
                          <i className='bi bi-lightbulb-fill menu-icon'></i>
                          <br />

                          <br />
                          <p className='card-title'>Class room</p>
                          <Link to='/class/room/s4mcb' className='mb-2 mb-xl-0'>
                            Senior 4 MCB
                          </Link>
                          <br />
                          <Link to='/class/room/s4pcb' className='mb-2 mb-xl-0'>
                            Senior 4 PCB
                          </Link>
                          <br />
                          <Link to='/class/room/s4lkk' className='mb-2 mb-xl-0'>
                            Senior 4 LKK
                          </Link>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12 grid-margin stretch-card'>
                <div className='card position-relative'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-12 col-xl-3 d-flex flex-column justify-content-start'>
                        <div className='ml-xl-4 mt-3'>
                          <i className='bi bi-lightbulb-fill menu-icon'></i>
                          <br />

                          <br />
                          <p className='card-title'>Class room</p>
                          <Link to='/class/room/s5mcb' className='mb-2 mb-xl-0'>
                            Senior 5 MCB
                          </Link>
                          <br />
                          <Link to='/class/room/s5pcb' className='mb-2 mb-xl-0'>
                            Senior 5 PCB
                          </Link>
                          <br />
                          <Link to='/class/room/s5lkk' className='mb-2 mb-xl-0'>
                            Senior 5 LKK
                          </Link>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12 grid-margin stretch-card'>
                <div className='card position-relative'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-12 col-xl-3 d-flex flex-column justify-content-start'>
                        <div className='ml-xl-4 mt-3'>
                          <i className='bi bi-lightbulb-fill menu-icon'></i>
                          <br />

                          <br />
                          <p className='card-title'>Class room</p>
                          <Link to='/class/room/s6mcb' className='mb-2 mb-xl-0'>
                            Senior 6 MCB
                          </Link>
                          <br />
                          <Link to='/class/room/s6pcb' className='mb-2 mb-xl-0'>
                            Senior 6 PCB
                          </Link>
                          <br />
                          <Link to='/class/room/s6lkk' className='mb-2 mb-xl-0'>
                            Senior 6 LKK
                          </Link>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Rooms);
