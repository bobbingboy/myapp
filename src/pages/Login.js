import React from 'react';
import axios from 'commons/axios';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }} = useForm();
  
  const onSubmit = async data => {
    // 2.獲取表單數據
    // 3.處理登入邏輯
    try {
      
      const { email, password} = data
      const res = await axios.post('/auth/login', { email, password })
      const jwToken = res.data;
      console.log(jwToken);
      global.auth.setToken(jwToken);
      navigate("../", { replace: true });
      toast.success('Login Success');

    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data.message;
      toast.error(message);
    }
    
    // 4.跳轉頁面
    // navigate('/')
  };
  
  

  return (
    <div className="login-wrapper">
            <form className="box login-box" onSubmit={ handleSubmit(onSubmit) }>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                  className={`input ${errors.email && 'is-danger'}`}
                  type="text" 
                  placeholder="Email"
                  name='email' 
                  {...register(
                    "email", {required: "email is required",
                      pattern: {
                        value: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                        message: 'invalid email form' // JS only: <p>error message</p> TS only support string
                      }
                    }
                    )
                  }
                  />
                  {
                  errors.email && (
                    <p className="helper has-text-danger">{errors.email.message}</p>
                  )
                  }
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                  className={`input ${errors.password && 'is-danger'}`}
                  type="password" 
                  placeholder="Password" 
                  name='password'
                  {...register(
                    "password",
                    {required:"password is required",
                      minLength: {
                        value: 6,
                        message: 'password cannot be less than 6 digits' // JS only: <p>error message</p> TS only support string
                      }
                    }
                    )
                  }
                  />{errors.password && (
                    <p className="helper has-text-danger">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div className="control">
                <button className="button is-fullwidth is-primary">Login</button>
              </div>
            </form>
      </div>
  )
}
