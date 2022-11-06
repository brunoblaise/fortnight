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
  return (
    <nav className='sidebar sidebar-offcanvas' id='sidebar'>
      <ul className='nav'>
        <li className='nav-item active'>
          <Link className='nav-link' to='/dashboardT'>
            <i className='bi bi-dash-square-dotted menu-icon'></i>
            <span className='menu-title menu-icon'>Dashboard</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/teacher'>
            <i className='bi bi-cpu  menu-icon'></i>
            <span className='menu-title'>Profile</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/libraryT'>
            <i className='bi bi-book menu-icon'></i>
            <span className='menu-title'>Library</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/messageT'>
            <i className='bi bi-chat-square-dots menu-icon'></i>
            <span className='menu-title'>Message</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/notesT'>
            <i className='bi bi-journals menu-icon'></i>
            <span className='menu-title'>Notes</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/worksT'>
            <i className='bi bi-hexagon-fill menu-icon'></i>
            <span className='menu-title'>Works</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/reportT'>
            <i className='bi bi-award menu-icon'></i>

            <span className='menu-title'>Report</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/text'>
            <i className='bi bi-clipboard-data menu-icon'></i>

            <span className='menu-title'>Smart class</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/class'>
            <i className='bi bi-collection-play menu-icon'></i>
            <span className='menu-title'>Rooms</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/create/room/Create'>
            <i className='bi bi-asterisk  menu-icon'></i>
            <span className='menu-title'>Create</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/create/room/Created'>
            <i className='bi bi-asterisk  menu-icon'></i>
            <span className='menu-title'>Created</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/meet'>
            <i className='bi bi-pause-btn menu-icon'></i>
            <span className='menu-title'>Video chat</span>
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to='/Syllabust'>
            <i className='bi bi-asterisk  menu-icon'></i>
            <span className='menu-title'>Syllabus</span>
          </Link>
        </li>
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
        <br />
        <br />
        <br />
        <br />
    
        <li className='nav-item active' onClick={(e) => logout(e)}>
          <Link className='nav-link' to='/'>
            <i className='bi bi-box-arrow-left  menu-icon'></i>
            <span className='menu-title'>Log out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Sidebar);
