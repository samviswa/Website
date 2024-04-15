import { BsTags } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Winfinity = ({ gameName, ticketAmount, total, Time }) => {

    return (
        <div className="rounded-lg p-4 mb-1 w-[400px] h-[200px] shadow-2xl  transform hover:scale-105 shadow-xl">
            <div className='bg-gradient-to-b h-12 from-slate-200 to-slate-300 w-[400px] -ml-4 -mt-4 '>
                <h4 className="text-lg alfa text-blue-800 p-2">{gameName}</h4>
            </div>
            <h1 className="text-2xl font-extrabold mt-4 mb-2">₹ {total}</h1>
            <div className='flex flex-row items-center gap-2'>
                <BsTags />
                <p className="text-gray-600">₹ {ticketAmount}</p>
            </div>
            <div className="flex items-center">
                <LuAlarmClock />
                <span className="ml-2">{Time}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <IoIosInformationCircleOutline color='blue' />
                <a href="/lottery-info" className="text-blue-500 no-underline">
                    <span>About</span>
                </a>
            </div>
            <a href="/monthly" className='flex justify-center'>
                <button className="border-yellow-500 border-2 font-bold rounded-full text-yellow-500 -mt-5 -mr-64 w-28 p-1 cursor-pointer" type="button" >Play now</button>
            </a>
        </div>
    );
}

export default Winfinity;