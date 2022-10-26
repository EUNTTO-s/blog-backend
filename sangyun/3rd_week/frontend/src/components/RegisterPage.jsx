import React, { useRef } from 'react';
import Auth from '../services/auth.service';
import './RegisterPage.css';
const RegisterPage = () => {
  const btn = useRef();
  const email = useRef();
  const password = useRef();
  const nickname = useRef();

  return (
    <form className="registerPage" onSubmit={(e) => {
      e.preventDefault();
      console.log("email: ", email);
      console.log("password: ", password);
      Auth.register(email.current.value, password.current.value, nickname.current.value);
    }}>
      <label className='title'> 회원가입 </label>
      <div className="input-wrapper mb-1">
        <label htmlFor="email" className="form-label">
          이메일
        </label>
        <input type="email" className="form-control" id="email" ref={email}/>
      </div>
      <div className="input-wrapper mb-1">
        <label htmlFor="password" className="form-label">
          닉네임
        </label>
        <input
          type="nickname"
          className="form-control"
          id="nickname"
          ref={nickname}
        />
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
        가입
      </button>
    </form>
  );
}

export default RegisterPage;
