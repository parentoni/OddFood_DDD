import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

export const MainPage = () => {
    return (
        <div className="h-screen w-screen ">
            <div className='h-full w-full p-6'>
                <header className='h-[5%]  flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-semibold'>OddFood</h1>

                    <button className=' bg-red-500 px-1 flex flex-row items-center justify-around h-full w-20 rounded-lg'>
                        <IoCartOutline  size={32} color={"#FFFFFF"}/>
                        <p className='text-3xl text-white'>4</p>
                    </button>
                </header>

            </div>
        </div>
    )
}