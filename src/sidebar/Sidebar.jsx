import React from 'react';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
function Sidebar({setAuth}) {
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Logout successfully');
    } catch (err) {
      console.error(err.message);
    }
  };
  const month = new Date().getMonth() + 1;
  return (
    <nav className='sidebar sidebar-offcanvas' id='sidebar'>
      <ul className='nav'>
        <li className='nav-item active'>
          <Link className='nav-link' to='/dashboard' activeClassName='active'>
            <i className='bi bi-dash-square-dotted menu-icon'></i>
            <span className='menu-title menu-icon'>Dashboard</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/profile' activeClassName='active'>
            <i className='bi bi-cpu  menu-icon'></i>
            <span className='menu-title'>Profile</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/library' activeClassName='active'>
            <i className='bi bi-book menu-icon'></i>
            <span className='menu-title'>Library</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/message' activeClassName='active'>
            <i className='bi bi-chat-square-dots menu-icon'></i>
            <span className='menu-title'>Message</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/notes' activeClassName='active'>
            <i className='bi bi-journals menu-icon'></i>
            <span className='menu-title'>Notes</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/works' activeClassName='active'>
            <i className='bi bi-hexagon-fill menu-icon'></i>
            <span className='menu-title'>Works</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/report' activeClassName='active'>
            <i className='bi bi-award menu-icon'></i>

            <span className='menu-title'>Report</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            to='/room/student'
            activeClassName='active'>
            <i className='bi bi-clipboard-data menu-icon'></i>

            <span className='menu-title'>Room class</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/room/test' activeClassName='active'>
            <i className='bi bi-asterisk  menu-icon'></i>
            <span className='menu-title'>Test</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/meet' activeClassName='active'>
            <i className='bi bi-pause-btn menu-icon'></i>
            <span className='menu-title'>Video chat</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/lab' activeClassName='active'>
            <i className='bi bi-pause-btn menu-icon'></i>
            <span className='menu-title'>Lab</span>
          </Link>
        </li>


        <li className='nav-item'>
          <Link className='nav-link' to='/Syllabus' activeClassName='active'>
            <i className='bi bi-asterisk  menu-icon'></i>
            <span className='menu-title'>Syllabus</span>
          </Link>
        </li>
        {month === 7 ? (
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='/UpdateClass'
              activeClassName='active'>
              <i className='bi bi-pause-btn menu-icon'></i>
              <span className='menu-title'>Update your class</span>
            </Link>
          </li>
        ) : (
          <li className='nav-item'>
            <Link className='nav-link' activeClassName='active'>
              <i className='bi bi-pause-btn menu-icon'></i>
              <span className='menu-title'>wait for promotion</span>
            </Link>
          </li>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <li className='nav-item active' onClick={(e) => logout(e)}>
          <Link className='nav-link' to='/' activeClassName='active'>
            <i className='bi bi-box-arrow-left  menu-icon'></i>
            <span className='menu-title'>Log out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Sidebar);
