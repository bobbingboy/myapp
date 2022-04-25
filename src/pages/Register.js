import React from 'react';
import axios from 'commons/axios';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }} = useForm();
  
  const onSubmit = async data => {
    // rigister logic
    try {
      
      const { nickname, email, password} = data
      const res = await axios.post('/auth/register', { 
        nickname, 
        email, 
        password, 
        type: 0 
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success('Register Success');
      // jump to index page
      navigate("../", { replace: true });

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
                <label className="label">Nickname</label>
                <div className="control">
                  <input 
                  className={`input ${errors.nickname && 'is-danger'}`}
                  type="text" 
                  placeholder="Nickname"
                  name='nickname' 
                  {...register(
                    "nickname", {required: "nickname is required"
                    })}
                  />
                  {
                  errors.nickname && (
                    <p className="helper has-text-danger">{errors.nickname.message}</p>
                  )
                  }
                </div>
              </div>
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
                <button className="button is-fullwidth is-primary">Submit</button>
              </div>
            </form>
      </div>
  )
}
