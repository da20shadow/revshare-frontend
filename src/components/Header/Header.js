import {NavLink} from "react-router-dom";
import logo from '../../assets/img/logo.jpg';
import {BsTelegram} from 'react-icons/bs';
import {AiOutlineMenu,AiOutlineClose,AiOutlineLogin,AiOutlineUserAdd} from 'react-icons/ai';
import {useState} from "react";

function Header() {
    const [activeMenu,setActiveMenu] = useState(false);
    const isLogged = true;

    const linkStyle = `block hover:shadow-md lg:inline border border-white text-gray-700 hover:border-sky-700 hover:text-sky-800 px-3 py-1 rounded-md text-lg font-medium`;
    const activeLinkStyle = `block hover:shadow-md lg:inline border bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-md text-lg font-medium`;

    const userLinks = (
        <>
            <NavLink to="/affiliates" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Affiliates</NavLink>
            <NavLink to="/edit" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Edit Profile</NavLink>
            <NavLink to="/account" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Account</NavLink>
            <NavLink to="#" className={linkStyle}>Logout</NavLink>
        </>
    );
    const guestLinks = (
        <>
            <NavLink to="/" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Home</NavLink>
            <NavLink to="/news" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>News</NavLink>
            <NavLink to="/faq" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>FAQ</NavLink>

            <NavLink to="/login" className={'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-md text-white font-bold hover:text-orange-100 px-3 py-1 rounded-md text-lg font-medium flex items-center flex-nowrap'}>
                <AiOutlineLogin /> Login
            </NavLink>
            <NavLink to="/register" className={`bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-md text-white font-bold hover:text-sky-100 to-orange-400 px-3 py-1 rounded-md text-lg font-medium flex items-center flex-nowrap`}>
                <AiOutlineUserAdd /> Register
            </NavLink>
        </>
    );

    return (
        <>
        <header className={'container mx-auto'}>

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-20">

                    {/*Button open close menu*/}
                    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">

                        <button type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setActiveMenu(!activeMenu)}>
                            {
                                activeMenu ? <AiOutlineClose className={'h-6 w-6'} /> : <AiOutlineMenu className={'h-6 w-6'} />
                            }

                        </button>

                    </div>

                    {/*Navigation Bar*/}
                    <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                        {/*Logo*/}
                        <div className="flex-shrink-0 flex items-center">
                            <a href={'/'}>
                            <img className="block lg:hidden h-8 w-auto"
                                 src={logo} alt="Logo" />
                                <img className="hidden lg:block h-8 w-auto"
                                     src={logo}
                                     alt="Logo" />
                            </a>
                        </div>
                        {/*Nav Links*/}
                        <div className="hidden lg:block sm:ml-40">
                            <div className="flex items-center space-x-4">
                                {
                                    isLogged
                                        ? userLinks
                                        : guestLinks
                                }
                            </div>
                        </div>

                    </div>

                    <div className="hidden lg:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <a href={'#'} title={'Telegram Channel'}>
                            <BsTelegram size={'24px'} color={'#0f80ba'}/>
                        </a>
                    </div>

                </div>
            </div>
            { activeMenu
                    ? <div className="lg:hidden fixed top-20 mx-auto z-50 w-full md:w-3/4 bg-white shadow-lg rounded-b-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1" onClick={()=>setActiveMenu(!activeMenu)}>

                            {isLogged ? userLinks : guestLinks}

                        </div>
                    </div>
                    : ''
            }
        </header>
        </>
    )
}

export default Header;