import React, { useRef } from 'react';
import './LoginPage.css';
import Auth from '../services/auth.service';

const LoginPage = () => {
  const btn = useRef();
  const email = useRef();
  const password = useRef();

  return (
    <form className="loginPage" onSubmit={(e) => {
      e.preventDefault();
      console.log("useRef: ", btn);
      console.log("useRef: ", email);
      console.log("useRef: ", password);
      Auth.login(email.current.value, password.current.value);
    }}>
      <label className='title'> 로그인 </label>
      <div className="input-wrapper mb-3">
        <label htmlFor="email" className="form-label">
          이메일
        </label>
        <input type="email" className="form-control" id="email" ref={email}/>
      </div>
      <div className="input-wrapper mb-3">
        <label htmlFor="password" className="form-label">
          비밀번호
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          ref={password}
        />
      </div>
      <div className='blank'></div>
      <button type="submit" className="btn btn-success" ref={btn}>
        로그인
      </button>
    </form>
  );
}

export default LoginPage;
