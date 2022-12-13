import style from './singup.module.css'
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import React from 'react';
import axios from 'axios';

const Singup3 = () => {

    const context = React.useContext(AppContext);

    const onAddToServer = async (obj) => {
        const res = await axios.post('https://63500d6078563c1d82b78f08.mockapi.io/api/form', obj);

        //const res2 = await axios.post('http://localhost:8080/main/api/post', obj);
        const res3 = await axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: 'http://localhost:8080/main/api/post',
            data: { 
                
                login: context.dataForm.login,
                //lastName: context.dataForm.lastName,
                email: context.dataForm.email,
                phone: context.dataForm.phone,
                password: context.dataForm.password
            }
        })

        if(res.status === 201) {
            alert('Ваша форма успешно отправлена')
        } else {
            alert('Что-то пошло не так');
        }
        context.dataForm.login = null;
        //context.dataForm.lastName = null;
        context.dataForm.email = null;
        context.dataForm.phone = null;
        context.dataForm.hasPhone = false;
        context.dataForm.password = null;
        
    }
    const onClickBtn = () => {
        onAddToServer({...context.dataForm});
    }

    return(
        <div className={style.singin_page}>
        <div className={style.container}>
            <p className={style.login}>REGISTRATION</p>
            <span>
            {
                    context.dataForm ? 
                    <>
                        <p ><span className={style.log}>login:</span> {context.dataForm.login}</p>
                        <p><span className={style.log}>email:</span> {context.dataForm.email}</p>
                        {context.dataForm.hasPhone && <p><span className={style.log}>phone: </span>{context.dataForm.phone}</p>}                        
                    </> : <p>Вы не заполнили форму, вернитесь назад, чтобы заполнить форму заново</p>
             }                
            </span>                
             <div>
                <Link to='/'>
                    <button onClick={onClickBtn} className={style.singin_btn}>Send</button> 
                </Link>                 
             </div>
             <div>
                <Link to='/singupsteptwo'>
                    <button className={style.singin_back_btn}>Back</button> 
                </Link>                
             </div>
        </div>
     </div>
    );
}

export default Singup3