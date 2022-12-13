import React from "react";

export const Context = React.createContext();

const ContextData = ({ chidren }) =>{
    const [data, setData] = React.useState({})

    const setValues = (values) =>{
        setData((prevData) => ({...prevData, ...values}))
    }

    return(
        <Context.Provider value={{ data, setValues}}>
            {chidren}
        </Context.Provider>        
    )
}

export default ContextData
