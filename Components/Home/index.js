import Link from 'next/link';
import {RiShoppingBag3Line} from 'react-icons/ri';
import {FaFileInvoiceDollar} from 'react-icons/fa';
import {GiPayMoney} from 'react-icons/gi';
function Home(){
    return (
        <div className="w-full px-4 lg:justify-center ">
            <div className='w-full h-full'>
                <img className="" src='/media/banner1.png' />
            </div>
            <div className=" rounded-lg absolute text-justify top-48 lg:top-1/4 lg:ml-20 lg:text-3xl  font-bold bg-cyan-100 p-2 shadow-lg bg-opacity-60">
                Controla tus finanzas personales
            </div>
            <div className='mt-1 bg-lime-400 p-2 rounded-lg shadow-xl  bg-opacity-20 lg:font-bold lg:ml-60 lg:-mt-24 lg:absolute '>
                Una vida financieramente plena, comienza con una acciones constantes y medibles.
            </div>
            <div className='botonera flex space-x-3 mt-5 w-full justify-center md:hidden'>
                <Link  href="/Presupuestos">
                    <div className="   p-2 rounded-lg shadow-lg nav-link flex space-x-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
                        <FaFileInvoiceDollar className=' text-blue-400 mt-1' />
                        <label>Presupuestos</label>
                    </div>
                </Link>
                <Link  href="/Compras">
                    <div className="  p-2 rounded-lg shadow-lg nav-link flex space-x-2  text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
                        <RiShoppingBag3Line className=' text-blue-400 mt-1'/>
                        <label>Compras</label>
                    </div>
                </Link>
                    
                <Link href="/Gastos">
                    <div  className="  p-2 rounded-lg shadow-lg nav-link flex space-x-2  text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">
                        <GiPayMoney className=' text-blue-400 mt-1'/>
                        <label>Gastos</label>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export {Home}