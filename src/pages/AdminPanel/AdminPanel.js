import {InnerHeader} from "../../components";
import {Link} from "react-router-dom";
import {useState} from "react";
import './AdminPanel.css';
import {AdminMenu} from "./Components";

function AdminPanel() {

    const [notifications, setNotifications] = useState([]);

    const boxStyle = 'px-4 py-3 text-center border border-gray-300 bg-gray-100 shadow-lg rounded-lg';
    const topText = 'font-bold text-lg border-b border-gray-500';
    const bottomText = 'text-gray-600';
    return (
        <>
            <InnerHeader title={'Admin Panel'}/>

            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <div className="h-fit mx-8">

                <AdminMenu />

                <div className={'text-center'}>
                    HERE WILL BE THE INFO!!!
                </div>


            </div>
        </>
    )
}
export default AdminPanel;