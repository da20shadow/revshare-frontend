import {Alert, InnerHeader} from "../../../../components";
import AdminMenu from "../AdminMenu";
import {BsCheckLg} from "react-icons/bs";
import {GiSandsOfTime} from "react-icons/gi";
import {useEffect, useState} from "react";
import {useStateContext} from "../../../../context/ContextProvider";
import {completeDeposit, getPendingDeposits, removeDeposit} from "../../../../services/paymentService";
import {useNavigate} from "react-router-dom";

function PendingDeposits() {
    const [notifications, setNotifications] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [pendingAmount, setPendingAmount] = useState(0);
    const {user, logoutUser} = useStateContext();
    const [offset, setOffset] = useState(0);

    const redirect = useNavigate()

    useEffect(() => {
        getPendingDeposits(offset, user.token)
            .then(res => {
                setDeposits(res.deposits);
                let total = 0;
                res.deposits.forEach(d => {
                    total += d.amount;
                })
                setPendingAmount(total);

            }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
        })
    }, [])

    const approveDeposit = (deposit_id, amount) => {

        completeDeposit({deposit_id, amount}, user.token)
            .then(res => {
                setPendingAmount(pendingAmount - amount);
                setDeposits(oldDeposits => oldDeposits.filter(d => d.id !== deposit_id));

                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Success'}
                               message={res.message}/>
                    ]);
            }).catch(err => {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={err.message}/>
                ]);
        })
        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_, i) => i !== 0));
        }, 2000);
    }
    const rejectDeposit = (deposit_id, amount) => {

        removeDeposit(deposit_id, user.token)
            .then(res => {
                setPendingAmount(pendingAmount - amount);
                setDeposits(oldDeposits => oldDeposits.filter(d => d.id !== deposit_id));
                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Success'}
                               message={res.message}/>
                    ]);
        }).catch(err => {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Success'}
                           message={err.message}/>
                ]);
        })

        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_, i) => i !== 0));
        }, 2000);

    }

    const showUserInfo = (user_id) => {
        console.log('User ID:',user_id)
        //TODO: redirect to single user info page and make request to /users/user_id
    }
    return (
        <>
            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <InnerHeader title={'Pending Deposits'}/>
            <AdminMenu/>

            <div className={'flex justify-center my-8'}>
                <div className={'px-8 py-4 bg-green-50 border shadow-lg text-center rounded-xl'}>
                    <div className={'flex justify-center items-center text-green-700'}>
                        <GiSandsOfTime size={'24px'}/>
                        <h3 className={'font-bold text-xl text-green-700'}>
                            ${pendingAmount.toFixed(2)}
                        </h3>
                    </div>
                    <p className={'text-gray-600'}>Pending Deposits</p>
                </div>
            </div>

            <div style={{'overflowX': "auto"}} className={'mx-8'}>
                <table className={'w-full'}>

                    <thead className={'bg-sky-700 text-white'}>
                    <tr>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>#</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Date</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Amount</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Coins</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Processor</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Wallet</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>User</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        deposits.map(d => (
                            <tr key={d.id} className={'hover:bg-gray-100 text-center'}>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.id}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.date}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>${(d.amount).toFixed(2)}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{(d.coins).toFixed(8)}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.processor}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.wallet}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>
                                    <span onClick={()=> showUserInfo(d.user_id)}
                                          className={'cursor-pointer hover:text-cyan-800'}>
                                        {d.username}
                                    </span>
                                </td>
                                <td className={'border-b border-gray-200 py-3 px-5'}>
                                    <button onClick={() => approveDeposit(d.id, d.amount)}
                                            className={'py-1 px-4 mx-1 text-green-900 hover:shadow-lg bg-green-50 hover:bg-green-200 text-sm border border-green-500 rounded'}>Approve
                                    </button>
                                    <button onClick={() => rejectDeposit(d.id, d.amount)}
                                            className={'py-1 px-4 mx-1 text-rose-800 hover:shadow-lg bg-rose-50 hover:bg-rose-200 text-sm border border-rose-500 rounded'}>Reject
                                    </button>
                                </td>

                            </tr>
                        ))
                    }

                    </tbody>

                </table>
            </div>

        </>
    )
}

export default PendingDeposits;