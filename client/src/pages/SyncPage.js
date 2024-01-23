import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook"
import MySelect from "../components/MySelect";

export default function SyncPage(){
    const {loading,error,request,clearError} = useHttp()

    const [usersList,setUsersList] = useState([])
    const [tablesList,setTableList] = useState([])
    const url = 'http://localhost:5000'

    useEffect(() => {
        const tablesreq = loadingHandler()
        console.log(tablesreq)
    },[])

    const loadingHandler = async () => {
        try{
            const res = await request('http://localhost:5000/db/gettables','POST')

            setTableList(() => {
                return res.map((tableName, index) => ({
                    value: index + 1,
                    label: tableName
                }))
            })
        }catch (e){
            console.log('error reading databases')
        }
    }
    const handleLoadingUsers = async (e) => {
        const res = await request(url+'/api/getusers','POST')
        setUsersList(res)
        console.log(res[0])
    }

    return (
        <div className='sync-box'>
            <div className='left-box'>
                <div className='control-box'>
                    <MySelect className='select' options={tablesList}/>
                    <div onClick={handleLoadingUsers} className='button'>Load users</div>
                    <div className='button'>Sync users</div>
                </div>
            </div>
            <div className='right-box'>
            </div>
        </div>
    )
}
