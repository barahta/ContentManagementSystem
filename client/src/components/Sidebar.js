import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar () {
    return (
        <aside className="sidebar">
            <div className='nav-left-box'>
                <Link to='/sync'>Database Synchronization</Link>
                <Link to='/'>Users List</Link>
                <Link to='/files'>Files</Link>
                <Link to='/'>Notifications</Link>
                <Link to='/'>Logs</Link>
                <Link to='/'>History</Link>
                <Link to='/'>Context Data</Link>
                <Link to='/'>Settings</Link>
            </div>
        </aside>
    )
};
