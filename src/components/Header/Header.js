import {NavLink, useNavigate} from "react-router-dom";
import logo from '../../assets/img/logo.jpg';
import {BsTelegram} from 'react-icons/bs';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';
import {AiOutlineMenu,AiOutlineClose,AiOutlineLogin,AiOutlineUserAdd} from 'react-icons/ai';
import {useState} from "react";
import {useStateContext} from "../../context/ContextProvider";

function Header() {
    const [activeMenu,setActiveMenu] = useState(false);
    const [activeDropdown,setActiveDropdown] = useState(false);
    const {user,isLogged,logoutUser} = useStateContext();
    const redirect = useNavigate();

    const linkStyle = `block hover:shadow-md lg:inline border border-white text-gray-700 hover:border-sky-700 hover:bg-gray-50 hover:text-sky-800 px-3 py-1 rounded-md text-lg font-medium`;
    const activeLinkStyle = `block hover:shadow-md lg:inline border bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-md text-lg font-medium`;

    const logout = (e) => {
        e.preventDefault();
        logoutUser();
        setTimeout(()=>{
            redirect('/login');
        },200)
    }

    const userLinks = (
        <>
            <div className="relative inline-block text-left"
                 onMouseEnter={()=>setActiveDropdown(true)}
                 onMouseLeave={()=>setActiveDropdown(false)}
            >
                <div>
                    <button type="button"
                            className={`hover:shadow-md border border-white text-gray-700 hover:border-sky-700 hover:bg-gray-50 hover:text-sky-800 px-3 py-1 rounded-md text-lg font-medium inline-flex justify-center items-center w-full`}
                            >
                        History <MdOutlineKeyboardArrowDown size={'24px'} />
                    </button>
                </div>
                {
                    activeDropdown
                        ? <div className="origin-top-right absolute left-0 w-72 lg:w-56 rounded-md shadow-lg bg-white ring-1 border border-gray-300 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1" role="none">
                                <NavLink to="/deposit-history"
                                         className={({isActive}) =>
                                             isActive ? 'block m-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md'
                                                 : 'border border-white hover:border-gray-300 text-gray-700 block m-2 px-4 py-2 hover:bg-gray-100 rounded-md'}>
                                    Deposit History
                                </NavLink>
                                <NavLink to="/withdrawal-history"
                                         className={({isActive}) =>
                                             isActive ? 'block m-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md'
                                                 : 'border border-white hover:border-gray-300 text-gray-700 block m-2 px-4 py-2 hover:bg-gray-100 rounded-md'}>
                                    Withdrawals History
                                </NavLink>

                            </div>
                        </div>
                        : ''
                }

            </div>

            {
                user.role === 1 
                    ? <NavLink to="/scradminpanel" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Admin Panel</NavLink>
                    : ''
            }
            <NavLink to="/affiliates" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Affiliates</NavLink>
            <NavLink to="/edit" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Edit Profile</NavLink>
            <NavLink to="/account" className={({isActive}) => isActive ? activeLinkStyle : linkStyle}>Account</NavLink>
            <NavLink onClick={logout} to="#" className={linkStyle}>Logout</NavLink>
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