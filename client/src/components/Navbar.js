import React from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faWrench } from '@fortawesome/free-solid-svg-icons'

export default function Navbar () {
    return (
        <header className='header'>
            <nav>
                <div className='logo-box'>
                    <div className='logo'><FontAwesomeIcon icon={faWrench} color='rgba(180, 180, 180, 1)' fontSize='30px'/></div>
                    <Link to="/lk">Content Management System</Link>
                </div>
                <div className='menu-box'>
                    <Link to="/main"><p>main</p></Link>
                    <Link to="/"><p>dashboard</p></Link>
                </div>
            </nav>
            <hr/>
        </header>

    )
};
