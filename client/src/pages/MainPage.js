import React, {useEffect, useState} from "react";
import {Link,useLocation} from 'react-router-dom';
export default function MainPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        //event.preventDefault();
    };
    return (
        <div className='auth'>
            <div className='auth_back'>
                <div className='auth_form'>
                    <div className='logo'></div>
                    <div className='inauth'>
                        <input type="text" placeholder='Имя пользователя:' value={username} onChange={handleUsernameChange} autoComplete="off"/>
                        <input type="password" placeholder='Пароль' value={password} onChange={handlePasswordChange} autoComplete="off" />
                        <Link to="/news" className='button' onClick={handleSubmit}>Войти</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
