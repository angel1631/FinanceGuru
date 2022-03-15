import { useEffect, useState } from 'react';
import {format_currency} from '../../Core/functions/number';
function Resumen({list}){
    let total_mes = useState(0);
    useEffect(()=>{
        console.log(".....list", list);
        let now = new Date();
        let mes_actual = String(now.getMonth() + 1).padStart(2, '0');
        let total = 0;
        if(list){
            list[0].map(item=>{
                let fecha = new Date(item.createdAt+"T00:00:00");
                let mes_item = String(fecha.getMonth() + 1).padStart(2, '0');
                if(mes_actual===mes_item) total += parseFloat(item.monto);
                
            });
        }
        total_mes[1](total);
    },[list]);
    
    return( <div className="p-2 bg-sky-500 text-white fixed bottom-2 left-2 rounded-lg flex space-x-4 shadow-lg">
                <div className='font-bold'>Gastos del mes:</div>
                <div>{format_currency({val:total_mes[0]})}</div>
            </div>
    );
}
export {Resumen};