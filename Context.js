import React from "react";
import {useLocalStorage} from './hooks/useLocalStorage'


const Context = React.createContext();

function ContextProvider(props){
    let states = {};
    states.state_presupuestos = useLocalStorage({nameItem: 'presupuestos', defaultValue:[]});
    states.gastos = useLocalStorage({nameItem: 'gastos', defaultValue: []});
    states.buys = useLocalStorage({nameItem: 'buys', defaultValue:[]});
    states.items = useLocalStorage({nameItem: 'items', defaultValue:[]});
    states.marcas = useLocalStorage({nameItem: 'marcas', defaultValue:[]});
    return (
        <Context.Provider value={{
            states
        }}>
          {props.children}
        </Context.Provider>
    );
}

export {Context, ContextProvider}