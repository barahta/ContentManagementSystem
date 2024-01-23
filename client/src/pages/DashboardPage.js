import React, {useEffect, useState} from "react";
import {Link,useLocation} from 'react-router-dom';
export default function DashboardPage(){
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

                    </div>
                </div>
            </div>
        </div>
    )
}
