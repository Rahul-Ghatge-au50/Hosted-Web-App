import React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import registerImg from '../../Images/Signup-image.jpg';
import './register.css';
import axios from 'axios';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name:name,
            email:email,
            password:password
        }

        await axios.post('http://localhost:5001/api/register',data);
        navigate('/login');
    }

  return (
    <>
         <div className="register-cont">
                <div className='register-img-cont' >
                    <img src={registerImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <form onSubmit={handleSubmit} className='register-form'>
                    <input
                        type="text"
                        placeholder='Enter full name'
                        className='register-input'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder='@gmail'
                        required
                        className='register-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='register-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='register-btns' >
                        <div>
                            <button type='submit' className='btn' >SIGN UP</button>
                        </div>
                        <Link to={'/login'}>
                            <button className='btn'>LOG IN</button>
                        </Link>
                    </div>
                </form>
            </div>
    </>
  )
}

export default Register
