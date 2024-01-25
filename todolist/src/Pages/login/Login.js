import React, { useContext } from 'react';
import { useState } from 'react';
import LoginImg from '../../Images/ReactTask.png';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/context';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [message,setMessage] = useState('');
    const {dispatch} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try{
            const data = {
                email: username,
                password: password
            }
    
    
            const res = await axios.post('http://localhost:5001/api/login', data);
            if(res.data === 'Incorrect Password'){
                setError(true);
                setMessage(res.data);
                dispatch({type:"LOGIN_FAILURE"});
            }else if(res.data === 'User is not register'){
                alert('You are not registerd');
                navigate('/register');
                dispatch({type:"LOGIN_FAILURE"});
            }else{
                dispatch({type:"LOGIN_SUCCESS",payload:res.data.data})
                // console.log(res.data.data);
                navigate(`/todo/${res.data.data._id}`);
            }
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"});
        }
        
    }

    return (
        <>
            <div className='container' >
                <div className="login-cont">
                    <div className='img-cont' >
                        <img src={LoginImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="form-cont">
                        <h1>Login In</h1>
                        <form onSubmit={handleSubmit} className="login-form">
                            <input
                                type="text"
                                placeholder="Username"
                                className="login-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {error ? <p style={{color:'red'}} >{message}</p> : '' }
                            <div className="login-btn">
                                <button type="submit" className="btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
