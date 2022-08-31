import './Footer.css';
import darkLogo from '../../assets/img/dark-logo.png';
import {Link} from "react-router-dom";
import AdBanner from "../AdBanner";

function Footer() {
    const linkStyle = 'hover:text-orange-700 px-3 text-lg'
    return (
        <>
            <AdBanner />

            <footer>

                <div className="footer-bg">
                    <div className={'w-full md:w-3/4 mx-auto flex justify-between items-center '}>
                        <img src={darkLogo} alt=""/>
                        <div className={'text-center text-gray-400'}>
                            <Link className={linkStyle} to={'/'}>Home</Link>
                            <span>|</span>
                            <Link className={linkStyle} to={'/how'}>How it Works</Link>
                            <span>|</span>
                            <Link className={linkStyle} to={'/news'}>News</Link>
                            <span>|</span>
                            <Link className={linkStyle} to={'/faq'}>FAQ</Link>
                            <span>|</span>
                            <Link className={linkStyle} to={'/contact'}>Support</Link>
                        </div>
                    </div>
                </div>

                <div className={'bg-slate-800 py-2 w-full'}>
                    <p className={'text-center text-gray-200'}>&copy; 2022 lucrative-shares.com. All Rights Reserved</p>
                </div>

            </footer>
        </>

    )
}

export default Footer;