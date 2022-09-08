import {Alert, InnerHeader} from "../../components";
import {useEffect, useState} from "react";
import * as paymentService from "../../services/paymentService";
import {useStateContext} from "../../context/ContextProvider";
import EditWallets from "./EditWallets";
import EditPassword from "./EditPassword";
import EditEmail from "./EditEmail";
import {useNavigate} from "react-router-dom";

function Edit() {
    const redirect = useNavigate();
    const {user, logoutUser} = useStateContext();
    const [processors, setProcessors] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        paymentService.getProcessors(user.token).then(res => {
            setProcessors(res.processors);
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
        })
        paymentService.getUserWallets(user.token)
            .then(r => {
                setWallets(r.wallets);
            }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
        });
    }, [])

    const boxStyle = 'shadow-lg border border-gray-300 bg-gray-100 py-5 px-10 rounded-md';
    const inputStyle = 'my-2 py-3 px-5 w-full rounded-md';
    const saveBtn = 'my-2 py-2 px-5 font-bold hover:shadow-lg text-gray-100 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md'


    return (
        <>
            <InnerHeader title={'Edit Profile'}/>

            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>

                                {/*Change Password*/}
                                <EditPassword styles={{boxStyle, inputStyle, saveBtn}}
                                              user={user}
                                              logoutUser={logoutUser}
                                              setNotifications={setNotifications}/>

                                {/*Change Email*/}
                                <EditEmail styles={{boxStyle, inputStyle, saveBtn}}
                                           user={user}
                                           logoutUser={logoutUser}
                                           setNotifications={setNotifications}/>

                                {/*Change Payment Processors*/}
                                <EditWallets styles={{boxStyle, inputStyle, saveBtn}}
                                             user={user}
                                             logoutUser={logoutUser}
                                             setNotifications={setNotifications}
                                             wallets={wallets}
                                             processors={processors}/>


                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Edit;