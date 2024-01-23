import React, {useEffect, useState} from 'react';
import {findAllByDisplayValue} from "@testing-library/react";

import {useHttp} from "../hooks/http.hook"
import { useReactToPrint } from 'react-to-print';

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const [usersList, setUsersList] = useState([{}])
    const {loading,error,request,clearError} = useHttp()
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleClick = (itemId,id,name) => {
        setSelectedItem(itemId);
        setSelectedUser(name)
        setSelectedUserId(id)
        setMessage('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('Отправка сообщения:', message);
        try{ //'https://3b6d10317e31.vps.myjino.ru/api/cms'
            let res
            if(!message) alert ('ВВеди сообщение')
            if(!selectedUserId) alert ('Выбери адресата')
            if(selectedUserId && message) {
                res = await request('http://localhost:5000/api/send','POST',{message,selectedUserId,selectedUser}).then(()=>{
                    setMessage('')
                })
            }
            console.log(res)
        }catch (e){
            console.log('error')

        }
    };
    const loadingHandler = async () => {
        try{ //'https://3b6d10317e31.vps.myjino.ru/api/cms'

            const res = await request('http://localhost:5000/api/cms','POST',{id, tokensrv})
            setUsersList(res)
            console.log(res)
        }catch (e){
            console.log('error reading databases')
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])

    class PrintableComponent extends React.Component {
        render() {
            return (
                <div>
                    <h1>Содержимое для печати</h1>
                    <p>Это текст, который будет напечатан.</p>
                </div>
            );
        }
    }
    const componentRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className='container'>
            <div className='sub'>
            <form className="message-form" onSubmit={handleSubmit}>
              <textarea
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Напишите ваше сообщение..."
                  className="message-input"
              />
                <button type="submit" className="submit-button">Отправить</button>

            </form>
            </div>
            <div className='sub sub2'>
                <div>
                    <table>
                        <thead>
                        <tr className='title'>
                            <th>Пользователь</th>
                            <th>ID</th>
                        </tr>
                        {usersList.map((item, index) => (
                            <tr onClick={() => handleClick(index,item.id_user,item.fullname,)} className={selectedItem === index ? 'selected' : ''} key={index}>
                                <td>{item.fullname}</td>
                                <td>{item.id_user}</td>
                            </tr>
                        ))}
                        </thead>
                    </table>
                </div>
            </div>

            <PrintableComponent ref={componentRef} />
            <button onClick={handlePrint} type="submit" className="submit-button">PRINT</button>

        </div>
    );
};

export default MessageForm;