import {Link} from "react-router-dom";

function AdminMenu(){

    const buttonStyle = 'blue-btn';

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-gray-50 border border-gray-100 shadow-lg px-4">

            <div className="my-4 text-center">
                <h3 className={'font-bold text-cyan-900 text-xl'}>Members</h3>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/add-news'} className={buttonStyle}>Add News</Link>
                </div>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/manage-news'} className={buttonStyle}>Manage News</Link>
                </div>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/shareholders'} className={buttonStyle}>Shareholders</Link>
                </div>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/manage-users'} className={buttonStyle}>Manage Users</Link>
                </div>
            </div>

            <div className="my-4 text-center">
                <h3 className={'font-bold text-cyan-900 text-xl'}>Payments</h3>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/pending-deposits'} className={buttonStyle}>Pending Deposits</Link>
                </div>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/pending-withdrawals'} className={buttonStyle}>Pending Withdrawals</Link>
                </div>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/deposit-history'} className={buttonStyle}>Deposits History</Link>
                </div>
                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/withdrawal-history'} className={buttonStyle}>Withdrawal History</Link>
                </div>
            </div>

            <div className="my-4 text-center">

                <h3 className={'font-bold text-cyan-900 text-xl'}>Shares</h3>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/share-dividends'} className={buttonStyle}>Share Profit</Link>
                </div>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/dividends-history'} className={buttonStyle}>Profit History</Link>
                </div>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/manage-shares'} className={buttonStyle}>Add New Shares</Link>
                </div>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/manage-shares'} className={buttonStyle}>Manage Shares</Link>
                </div>

            </div>

            <div className="my-4 text-center">
                <h3 className={'font-bold text-cyan-900 text-xl'}>Settings</h3>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/faq'} className={buttonStyle}>Edit FAQ</Link>
                </div>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/terms'} className={buttonStyle}>Edit Terms</Link>
                </div>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/edit-processors'} className={buttonStyle}>Edit Processors</Link>
                </div>

                <div className={'min-w-full'}>
                    <Link to={'/scradminpanel/deposit-history'} className={buttonStyle}>Promo Materials</Link>
                </div>


            </div>

        </div>
    )
}

export default AdminMenu;