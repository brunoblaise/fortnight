/** @format */

import React, { useEffect, useState } from 'react';

function Boardleader() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    let controller = new AbortController();
    const getProfile = async () => {
      try {
        const res = await fetch('https://api.quotable.io/random', {
          method: 'GET',
          signal: controller.signal,
        });

        const parseData = await res.json();

        setMessage(parseData);
        controller = null;
      } catch (err) {
        console.error(err.message);
      }
    };
    getProfile();
    return () => controller?.abort();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12 grid-margin stretch-card'>
        <div className='card position-relative'>
          <div className='card-body'>
            <div
              id='detailedReports'
              className='carousel slide detailed-report-carousel position-static pt-2 pointer-event'
              data-bs-ride='carousel'>
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <div className='row'>
                    <div className='col-md-12 col-xl-3 d-flex flex-column justify-content-start'>
                      <div className='ml-xl-4 mt-3'>
                        <i className='bi bi-lightbulb-fill menu-icon'></i>
                        <br />
                        <br />
                        <br />
                        <p className='card-title'>Generator Quote</p>
                        <h1
                          className='text-primary'
                          style={{ fontSize: '20px' }}>
                          {message.dateAdded}
                        </h1>
                        <h3 className='font-weight-500 mb-xl-4 text-primary'>
                          {message.author}
                        </h3>
                        <p className='mb-2 mb-xl-0'>{message.content}</p>
                      </div>
                    </div>
                    <div className='col-md-12 col-xl-9'>
                      <div className='row'>
                        <div className='col-md-6 border-right'>
                          <div className='table-responsive mb-3 mb-md-0 mt-3'>
                            <table className='table table-borderless report-table'>
                              <tbody>
                                <tr>
                                  <td className='text-muted'>Inspiration</td>
                                  <td className='w-100 px-0'>
                                    <div className='progress progress-md mx-4'>
                                      <div
                                        className='progress-bar bg-primary'
                                        role='progressbar'></div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className='font-weight-bold mb-0'>
                                      0--
                                    </h5>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className='col-md-6 mt-3'>
                          <div id='north-america-legend'>
                            <div className='report-chart'>
                              <i className='bi bi-cursor-fill  menu-icon'></i>
                              <br />
                              <br />
                              <div className='d-flex justify-content-between mx-4 mx-xl-5 mt-3'>
                                <div className='d-flex align-items-center'>
                                  <div className='mr-3'></div>
                                  <p className='mb-0'>Length</p>
                                </div>
                                <p className='mb-0'>{message.length}</p>
                              </div>
                              <div className='d-flex justify-content-between mx-4 mx-xl-5 mt-3'>
                                <div className='d-flex align-items-center'>
                                  <div className='mr-3'></div>
                                  <p className='mb-0'>Tags</p>
                                </div>
                                <p className='mb-0'>{message.tags}</p>
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
        </div>
      </div>
    </div>
  );
}

export default React.memo(Boardleader);
