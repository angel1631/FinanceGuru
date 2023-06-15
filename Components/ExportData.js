import {useContext, useState} from 'react';
import {Context} from '../Context';

function ExportData(){
    let {states} = useContext(Context);
    let seccion_activa = useState("");
    let importData = useState(false);
    let exportData = useState(false);
    let new_state = useState("");
    function import_data(){
        try{
            if(new_state[0]=="")throw "Error no se pego nada en texto a importar";
            let data = JSON.parse(new_state[0]); 
            Object.keys(states).map(e=>{
                states[e][1](data[e][0]);
            });
            alert("Importacion completa");
        }
        catch(error){
            alert(error);
        }
    }
    function borrar(){
        if(window.confirm("Esta seguro de vaciar toda la data del navegador")){    
            Object.keys(states).map(e=>{
                states[e][1]([]);
            });   
        }
        
    }
    console.log(states);
    return (
        <div className='flex flex-col items-center'>
            <div className='w-11/12 flex flex-col items-center lg:justify-evenly lg:flex-row'>
                <div className="w-11/12 lg:w-3/12 my-1 text-white bg-sky-400 py-2 rounded-lg shadow-lg font-bold text-center" onClick={()=>{seccion_activa[1]('export')}}>Export</div>
                <div className="w-11/12 lg:w-3/12 my-1 text-white bg-green-500 py-2 rounded-lg shadow-lg font-bold text-center" onClick={()=>{seccion_activa[1]('import')}}>Import</div>
                <div className="w-11/12 lg:w-1/12 my-1 text-white bg-red-500 py-2 rounded-lg shadow-lg font-bold text-center" onClick={borrar}>Borrar Data</div>
            
            </div>
            {seccion_activa[0] =='import' &&
                <div className='w-11/12'>
                    <h2 className='w-full font-bold mt-12 rounded-lg py-2 px-20 bg-green-200'>IMPORT</h2>
                    <div  className='mt-5 ml-1/12 w-11/12 p-5 font-bold'>
                       Pega el texto copiado del otro navegador
                    </div>
                    <textarea className='w-full' rows="15" onChange={(e)=>{new_state[1](e.target.value)}}></textarea>
                    <button className="my-4 bg-cyan-500 p-4 py-2 rounded-lg shadow-lg font-bold text-center" onClick={import_data}>Importar Data</button>
                </div>
            }
            {
                seccion_activa[0] == 'export' && 
                <div className='w-11/12'>
                    <h2 className='w-full font-bold mt-12 rounded-lg py-2 px-20 bg-green-200'>EXPORT</h2>
                    <div  className='mt-5 ml-1/12 w-11/12 p-5 font-bold'>
                        Copia el siguiente texto y pegalo en otro navegador en la opcion importar.
                    </div>
                    <div className='w-full flex justify-end' >
                        <button className='btn bg-yellow-300 w-6/12 lg:w-1/12 p-2 rounded-lg font-bold text-center' onClick={()=>{navigator.clipboard.writeText(JSON.stringify(states));alert('Copiado a portapapeles')}}>
                            COPIAR
                        </button>
                    </div>
                    <div className='mt-3 w-full p-2 bg-white'>
                        {JSON.stringify(states)}
                    </div>
                </div>    
            }
            
        </div>
    );
}

export {ExportData}