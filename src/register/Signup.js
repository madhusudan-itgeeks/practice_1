import React, { useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'all', 
  });
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const token=Cookies.get('token')
    if(token){
        navigate('/dashboard')
    }

})

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setFormData(data);

      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Signup successful!');
        console.log('Signup successful:', data);
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        const errorData = await response.json();
        if (errorData.error === 'Email is already in use') {
          toast.error('Email is already exist');
        } else {
          toast.error('Signup failed. Please check your information.');
        }
        console.error('Signup failed:', errorData);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main-register'>
      <div className='register-input'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='create-ac'>
            <h1>CREATE ACCOUNT</h1>
          </div>


          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              className='email'
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register('password', { required: 'Password is required' })}
              className='password'
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={!isValid || loading} style={{ backgroundColor: !isValid ? 'grey' : 'black' }}>
            {loading ? <div className='loader'></div> : 'CREATE'}
          </button><br></br>
         <div className='already'> <span >Already a member? <strong onClick={()=>navigate('/signin')} style={{color:'orange',fontWeight:'normal',cursor:'pointer'}}>Login</strong></span></div>
        </form>
      </div>
      
    </div>
  );
}

export default Register;




