
import { NavBar } from "./NavBar"

const Layout = ({children})=>{
    return (
        <div className="primary_container w-full h-screen bg-stone-100 flex flex-col items-center">
            <NavBar title="Finance Guru" />
            <div className="mt-16 w-full">
                {children}
            </div>
        </div>
    )
}
export {Layout};