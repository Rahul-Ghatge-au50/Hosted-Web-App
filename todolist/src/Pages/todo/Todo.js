import React, { useContext, useEffect, useState } from 'react'
import './todo.css';
import { UserContext } from '../../Context/context';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Todo() {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [todoList, setTodoList] = useState([]);
    const { user,dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`http://localhost:5001/api/todo/${id}`);
            setTodoList(res.data.data);
        }
        getData();
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            desc: desc,
            userId: id
        }

        const res = await axios.post(`http://localhost:5001/api/todo/${id}`, data);
        setName('');
        setDesc('');
    }

    const handleComp = async (e, id) => {
        e.stopPropagation();
        alert('Congratulation you have completed a task');
        await axios.delete(`http://localhost:5001/api/todo/${id}`);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        await axios.delete(`http://localhost:5001/api/todo/${id}`);
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        navigate('/login');
    }

    return (
        <>

            <div className='navbar' >
                <h4 style={{fontSize:'20px'}} >{user.name}</h4>
                <button onClick={handleLogout} className='todo-logout' >Log Out</button>
            </div>

            <div>
                <div className="todo-cont">
                    <h2 style={{ color: 'white' }} >My Todos</h2>
                    <form onSubmit={handleSubmit} className='todo-form' >
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} >
                            <div style={{ display: 'flex', flexDirection: 'column' }} >
                                <label className='todo-label' >Names</label>
                                <input
                                    type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className='todo-input' />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label className='todo-label' >Description</label>
                                <input
                                    type="text"
                                    value={desc}
                                    required
                                    onChange={(e) => setDesc(e.target.value)}
                                    className='todo-input' />
                            </div>
                        </div>
                        <div className='' >
                            <button className='Add-btn' type='submit' >Add Todo</button>
                        </div>
                    </form>

                    <div style={{ margin: '20px auto',width: '570px'}} >
                    {
                        todoList?.map((item) => {
                            return (
                                <>
                                    <div className="todo-list" key={item._id}>
                                        <div className='todo-data' >
                                            <h6>{item.name}</h6>
                                            <p>{item.desc}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button className='comp-btn' onClick={(e) => handleComp(e, item._id)} >Complete</button>
                                            <button className='dele-btn' onClick={(e) => handleDelete(e, item._id)}>Delete</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
