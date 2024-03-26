import React, { useState,useEffect } from 'react';
import styles from "./register.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(()=>{
    const token=Cookies.get('token')
    if(token){
        navigate('/dashboard')
    }

})

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
  
    if (!isEmailValid()) {
      setEmailError('Invalid email');
    }

    if (password.trim() === '') {
      setPasswordError('Password cannot be empty');
    }

    if (isEmailValid() && password.trim() !== '') {
      try {
        setLoading(true);

        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const token = data.token;
          console.log(token);
          Cookies.set('token', token, { expires: 1 });
          toast.success("Login successful!");
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          toast.error("Login failed!");
        }
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Invalid form submission");
    }
  };

  const navigatetoregister = () => {
    navigate('/');
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.inputdiv}>
          <h1>LOGIN</h1>
          <label htmlFor='email'>EMAIL</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={handleEmailChange}
            className={emailError ? styles.invalid : ''}
          />
          {emailError && <div className={styles.error}>{emailError}</div>}
          <label htmlFor='password'>PASSWORD</label>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPassword ? 'text' : 'password'} 
              id='password'
              value={password}
              onChange={handlePasswordChange}
              className={passwordError ? styles.invalid : ''}
            />
            <span className='eye' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <div className={styles.error}>{passwordError}</div>}
          <br />
         
          {(email === "" || email === null || password === "" || password === null) ?
            <button disabled={true} style={{ backgroundColor: "gray" }} onClick={handleSubmit} >
              {loading ? <div className='loader'></div> : 'SIGN IN'}
            </button> :
            <button onClick={handleSubmit}>
              {loading ? <div className='loader'></div> : 'SIGN IN'}
            </button>}
          <br />
          <div style={{ textAlign: 'center', paddingTop: '10px', fontSize: '16.5px', cursor: 'pointer' }}>
            <a onClick={navigatetoregister}>Create account</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;







