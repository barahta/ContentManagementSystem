import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook"
import MySelect from "../components/MySelect";

export default function SyncPage(){
    const {loading,error,request,clearError} = useHttp()

    const [dataList,setDataList] = useState([])
    const [tablesList,setTableList] = useState([])
    const [table,setTable] = useState([])
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
                    value: index+1,
                    label: tableName
                }))
            })
        }catch (e){
            console.log('error reading databases')
        }
    }
    const handleLoading = async (e) => {
        const res = await request(url+'/db/getselect','POST',{table})
        setDataList(res)
        console.log(res)
    }

    const handleSelectTable = (set) => {
        setTable(set.label)
    }

    return (
        <div className='sync-box'>
            <div className='left-box'>
                <div className='control-box'>
                    <MySelect setChange={handleSelectTable} className='select' options={tablesList}/>
                    <div onClick={handleLoading} className='button'>Load table</div>
                    <div className='button'>Sync table</div>
                </div>
            </div>
            <div className='right-box'>
                {dataList}
            </div>
        </div>
    )
}
