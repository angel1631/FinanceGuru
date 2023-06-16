import React, { useContext } from "react";
import { GenericForm } from "../../Core/components/GenericForm";
import { List } from "./List";
import {ListPrev} from './ListPrev';
import {GenericList } from "../../Core/components/GenericList";
import {getDateShort} from '../../Core/functions/date';
import {Context} from '../../Context';


function Compras() {
  let {states} = useContext(Context);
  let item_searched = React.useState("");
  let autoComplete = [];
  if(states.items) autoComplete = states.items[0];
  let fields = [
    {id: 'id', description: 'id', type: 'text', orden: 1, required:false, invisible:true},
    {id: "producto", description:'Item', type: 'text', orden:1, autoComplete,onBlur: (e)=>{item_searched[1](e.target.value)}},
    {id: "marca", description: 'Marca', type: 'text', orden:2},
    {id: "unidad", description: 'Tamaño', type: 'text', orden: 3},
    {id: "cantidad", description:'Cantidad', type: 'number', orden:4},
    {id: "precio", description:'Precio', type: 'number', orden:5},
  ];
  
  let fields_buy = [{id: "title", description:'Nombre de la compra', type: 'text', orden:1, default: 'Hola'},
                    {id: 'id', description: 'identificador de compra', type: 'number', invisible: true, required: false},
                    {id: 'createdAt', description: 'Fecha que se realizo la compra', type: 'date', required: false}];
  let buy_active = React.useState([0,-1]);
  let form_buy_visible = React.useState(false);
  let form_item_visible = React.useState(false);
  let form_buy = React.useState({title:'', createdAt: ''});
  let form_item = React.useState({id:'',unidad: '', marca: '', producto:'',cantidad:'',precio:''});

  let create_line_product = ({id,producto,cantidad,precio,unidad, marca})=>{
    if(buy_active[0][0]===0) throw "Debe seleccionar una compra para poder agregar un item";
    if(cantidad<=0) throw "La cantidad ingresada no es valida";
    if(precio<=0) throw "El precio del producto no esta correcto";
    
    let buys = JSON.parse(JSON.stringify(states.buys[0]));
    if(buys[buy_active[0][1]].id != buy_active[0][0]) throw "Error grave refrescar la pagina";
    let new_item = {producto,unidad, marca, cantidad,precio, total: parseFloat((cantidad*precio).toFixed(2))};
    if(parseInt(id)>0){
      buys[buy_active[0][1]].detail.map((item,index)=>{
        if(item.id==id){
          buys[buy_active[0][1]].detail[index] = new_item;
        } 
      });
      states.buys[1](buys);
    }else{
      new_item.id = parseInt(Math.random() * 1000000);
      buys[buy_active[0][1]].detail.push(new_item);
      states.buys[1](buys);
    }
    if(states.items[0].indexOf(producto)<0){
      states.items[1]([...states.items[0], producto]);
    }
  }
  let create_buy = ({id, title, createdAt})=>{
    if(!!id){
      let bc_compras = [...states.buys[0]];
      bc_compras.map((item,index)=>{
        if(item.id==id){
          let new_item = {id,title,createdAt, detail: bc_compras[index].detail }
          bc_compras[index] = new_item;
        }
      });
      states.buys[1](bc_compras);
    }else{
      if(title=="") throw "El campo titulo no es valido";
      let id = Math.floor(Math.random() * 10000);
      let createdAt = getDateShort(new Date());
      states.buys[1]([...states.buys[0],{title,id, createdAt,detail:[]}]);
    }
    
  }
  
  
  return (
      <div className="w-full h-full">
          {buy_active[0][0]===0 ? 
            <div className="w-full">
               {form_buy_visible[0] ? 
                  <GenericForm title="Agregar Compras" form_state={form_buy} fields={fields_buy} function_send={create_buy} state_show_form={form_buy_visible}/>
                  :
                  <GenericList 
                  title="Listado de Compras" 
                  lineOnClick={({line,index})=>{buy_active[1]([line.id, index])}}
                  state_show_form={form_buy_visible}
                  state_list={states.buys}
                  fields_display={[{col:"title", wid:'1/2'}, {col: "createdAt", wid: '1/2'}]} 
                  state_form={form_buy}/>
                }
            </div>
            : 
            <div className="w-full">
              {form_item_visible[0] ? 
                <GenericForm title="Agregar Items" form_state={form_item} fields={fields} function_send={create_line_product} state_show_form={form_item_visible}>
                  <ListPrev item_searched={form_item[0].producto} buys={states.buys} />
                </GenericForm>
                :
                <List buys={states.buys} headers={["producto","cantidad","precio","total"]} buy_active={buy_active} form_state={form_item} form_item_visible={form_item_visible[1]}/>
              } 
            </div>
          }
      </div>
  );
}
export {Compras};