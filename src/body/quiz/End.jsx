import React, {useEffect, useState} from 'react';

import jsPDF from 'jspdf';
import {toast} from 'react-toastify';
import {url} from '../../url';
import {useStoreState} from 'easy-peasy';

const Header = React.lazy(() => import('../../header/Header'));
const Sidebar = React.lazy(() => import('../../sidebar/Sidebar'));

function End({results, data, nameu, datas}) {
  const {token} = useStoreState((state) => state.Auth);
  const {profile} = useStoreState((state) => state.User);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [student] = useState(profile[0].student_email);
  const [name] = useState(datas.course_name);
  const [feedback] = useState('Great work');
  const [teacher] = useState(datas.teacher_email);

  const marks = Math.floor((correctAnswers / data.length) * 100);
  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].quiz_answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, []);

  const generatePdf = () => {
    let doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.querySelector('#contentp'), {
      callback: function (pdf) {
        pdf.save('certificate.pdf');
      },
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('jwt_token', token);

      const body = {marks, name, feedback, student, teacher};
      const response = await fetch(`${url}/create/marks`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        toast.success('Sent Successfully');
      } else {
        toast.error('Something is wrong');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Header />
      <div className='container-fluid page-body-wrapper'>
        <Sidebar />
        <div className='content-wrapper'>
          <button className={'btn btn-info'} onClick={generatePdf}>
            <i className='fa fa-paper-plane'></i>
            Download your report
          </button>
          <br />
          <br />
          <button
            className='btnSendMsg btn btn_info yur'
            id='sendMsgBtn'></button>
          <form onSubmit={onSubmitForm}>
            <div className='containerp' id='contentp'>
              <div className='logop'>Lycee De Kigali</div>

              <div className='marquee'>
                Marks
                <p>
                  {correctAnswers} of {data.length}
                </p>
                <strong>{marks}%</strong>
              </div>

              <div className='assignment'>This report is presented to</div>

              <div className='person'>{profile[0].student_fname}</div>

              <div className='reason'>
                for finishing the test given by his or her Teacher to {nameu}
              </div>
            </div>

            <br />
            <br />
            <button className={'btn btn-info'}>
              <i className='fa fa-paper-plane'></i>
              Save your marks
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default React.memo(End);
