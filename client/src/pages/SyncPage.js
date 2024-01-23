import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook"

export default function SyncPage(){
    const {loading,error,request,clearError} = useHttp()
    const [usersList,setUsersList] = useState([])
    const url = 'http://localhost:5000'
    const handleLoadingUsers = async (e) => {
        const res = await request(url+'/api/getusers','POST',{})
        setUsersList(res)
        console.log(res)
    }
    return (
        <div className='sync-box'>
            <div className='left-box'>
                <div className='control-box'>

                    <div onClick={handleLoadingUsers} className='button'>Load users</div>
                    <div className='button'>Sync users</div>
                </div>
            </div>

            <div className='right-box'>
                {usersList}
            </div>
        </div>
    )
}
