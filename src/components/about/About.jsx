import style from './about.module.css';
import { AppContext } from '../../App';
import React from 'react';

const About = () =>{

    const context = React.useContext(AppContext);

    const Sort = () =>{
        if(context.filterDeviceBtn) {
            context.setFilterDeviceBtn(false); 
        } else {
            context.setFilterDeviceBtn(true);
        }
    }

    return (
        <div className={style.text_section}>
            <div className={style.filter_line}>
                <h2>О нас</h2>
                <button className={style.filter_btn} onClick={Sort}>filter device</button>
            </div>
            
            <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, 
              <br/><br/>
              "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, 
            </p>
        </div>
    );
}

export default About;