import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
    <header className='bg-green-500 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='text-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-slate-1000'>Addis </span>
            <span className='text-slate-1000'>Real </span>
            <span className='text-slate-1000'>State</span>
        </h1>
        <form className='bg-slate-200 p-3 rounded-e-lg flex items-center'>
            <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-6 '>
            <Link to='/'>
                <li className='hidden sm:inline text-slate-800 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-800 hover:underline' >About</li>
                </Link>
                <Link to='/Sign-in'>
                <li className=' text-slate-800 hover:underline'>Sign In</li>
                </Link>
            </ul>
        </div>
    </header>
    )
}
