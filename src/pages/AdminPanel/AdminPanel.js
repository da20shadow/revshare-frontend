import {InnerHeader} from "../../components";
import {Link} from "react-router-dom";
import {useState} from "react";
import './AdminPanel.css';

function AdminPanel() {

    const [notifications, setNotifications] = useState([]);

    const boxStyle = 'px-4 py-3 text-center border border-gray-300 bg-gray-100 shadow-lg rounded-lg';
    const topText = 'font-bold text-lg border-b border-gray-500';
    const bottomText = 'text-gray-600';
    const buttonStyle = 'blue-btn';
    return (
        <>
            <InnerHeader title={'Admin Panel'}/>

            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="px-4 py-2 sm:px-0">
                        <div className="h-fit">

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-gray-50 border border-gray-100 shadow-lg px-4">

                                <div className="my-4 text-center">
                                    <h3 className={'font-bold text-xl'}>Members</h3>
                                    <div className={'min-w-full'}>
                                        <Link to={'add-news'} className={buttonStyle}>Add News</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'manage-news'} className={buttonStyle}>Manage News</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'shareholders'} className={buttonStyle}>Shareholders</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'manage-users'} className={buttonStyle}>Manage Users</Link>
                                    </div>
                                </div>

                                <div className="my-4 text-center">
                                    <h3 className={'font-bold text-xl'}>Payments</h3>
                                    <div className={'min-w-full'}>
                                        <Link to={'pending-deposits'} className={buttonStyle}>Pending Deposits</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'pending-withdrawals'} className={buttonStyle}>Pending Withdrawals</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'admin-deposit-history'} className={buttonStyle}>Deposits History</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'admin-withdrawal-history'} className={buttonStyle}>Withdrawal History</Link>
                                    </div>
                                </div>

                                <div className="my-4 text-center">
                                    <h3 className={'font-bold text-xl'}>Shares</h3>
                                    <div className={'min-w-full'}>
                                        <Link to={'share-dividends'} className={buttonStyle}>Share Dividends</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'admin-dividends-history'} className={buttonStyle}>Dividends History</Link>
                                    </div>
                                    <div className={'min-w-full'}>
                                        <Link to={'manage-shares'} className={buttonStyle}>Manage Shares</Link>
                                    </div>
                                </div>

                                <div className="my-4 text-center">
                                    <h3 className={'font-bold text-xl'}>Settings</h3>

                                    <div className={'min-w-full'}>
                                        <Link to={'admin-deposit-history'} className={buttonStyle}>Payment Processors</Link>
                                    </div>

                                    <div className={'min-w-full'}>
                                        <Link to={'admin-deposit-history'} className={buttonStyle}>Promo Materials</Link>
                                    </div>

                                </div>

                            </div>

                            <div className={'text-center'}>
                                HERE WILL BE THE INFO!!!
                            </div>


                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default AdminPanel;