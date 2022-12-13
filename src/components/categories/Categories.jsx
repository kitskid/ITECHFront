import React from "react";
import style from './categories.module.css';




const Categories = (props) =>{ 

    return(
        <div className={style.row}>
            <div className={style.conteiner}>
            {
             props.category.map(el => { 
                return(
                     <button 
                        className={style.category}
                        key={el.id}
                        onClick={() => props.chooseCategory(el.name)}
                     >{el.name}</button>  
                )             
            })   
            }    
            </div>
        </div>

    );
}
export default Categories;