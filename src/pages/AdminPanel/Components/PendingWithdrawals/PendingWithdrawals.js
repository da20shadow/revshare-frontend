import {useEffect, useState} from "react";
import {useStateContext} from "../../../../context/ContextProvider";
import {useNavigate} from "react-router-dom";
import {getCryptoPrice, getPendingWithdrawals} from "../../../../services/paymentService";
import {Alert, InnerHeader} from "../../../../components";
import AdminMenu from "../AdminMenu";
import {BsCheckLg} from "react-icons/bs";
import {GiSandsOfTime} from "react-icons/gi";
import * as paymentService from "../../../../services/paymentService";

function PendingWithdrawals() {
    const [notifications, setNotifications] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [pendingAmount, setPendingAmount] = useState(0);
    const {user,logoutUser} = useStateContext();
    const [offset,setOffset] = useState(0);

    const redirect = useNavigate()

    useEffect(() => {

        let coins = [];
        getCryptoPrice().then(res => {

            let btc = res.data.find(c => c.id === 'bitcoin');
            let eth = res.data.find(c => c.id === 'ethereum');
            let ltc = res.data.find(c => c.id === 'litecoin');
            let doge = res.data.find(c => c.id === 'dogecoin');

            if (btc && eth && ltc && doge) {
                coins.push(btc);
                coins.push(eth);
                coins.push(ltc);
                coins.push(doge);
            }

            let processors = [];
            paymentService.getProcessors(user.token).then(res => {

                processors = res.processors;
                getPendingWithdrawals(offset,user.token).then(res => {
                    let total = 0;
                    const includedCoinsArr = res.withdrawals.map(w => {
                        total += w.amount;
                        const currentProcessor = processors.find(p => p.name === w.processor);
                        const theCoin = coins.find(c => c.symbol === w.processor);
                        w.coins = (w.amount - currentProcessor.fees) / theCoin.priceUsd;

                        return w;
                    })
                    setWithdrawals(includedCoinsArr);
                    setPendingAmount(total);

                }).catch(err => {
                    if (err.message === 'Invalid or Expired Token!'){
                        logoutUser();
                        setTimeout(()=>{
                            redirect('/login')
                        },1000)
                    }
                    console.log(err.message)
                })
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })

    }, [])

    const approveWithdrawal = (withdrawal_id,amount) => {
        //TODO: update user balance and deposit status
        console.log('Approve Deposit ID: ',withdrawal_id)
        setPendingAmount(pendingAmount - amount);
        setWithdrawals(oldWithdrawals => oldWithdrawals.filter(w => w.id !== withdrawal_id));

        setNotifications(oldNotifications =>
            [...oldNotifications,
                <Alert alertType={'Success'}
                       message={'Successfully Approved!'}/>
            ]);

        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_,i)=> i !== 0));
        }, 2000);
    }
    const rejectWithdrawal = (withdrawal_id,amount) => {

        setPendingAmount(pendingAmount - amount);
        console.log('Reject withdrawal ID: ',withdrawal_id)
        setNotifications(oldNotifications =>
            [...oldNotifications,
                <Alert alertType={'Success'}
                       message={'Successfully Rejected!'}/>
            ]);

        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_,i)=> i !== 0));
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

            <InnerHeader title={'Pending Withdrawals'}/>
            <AdminMenu/>

            <div className={'flex justify-center my-8'}>
                <div className={'px-8 py-4 bg-rose-50 border shadow-lg text-center rounded-xl'}>
                    <div className={'flex justify-center items-center text-rose-700'}>
                        <GiSandsOfTime size={'24px'}/>
                        <h3 className={'font-bold text-xl text-rose-700'}>${pendingAmount.toFixed(2)}</h3>
                    </div>
                    <p className={'text-gray-600'}>Pending Withdrawals</p>
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
                        withdrawals.map(w => (
                            <tr key={w.id} className={'hover:bg-gray-100 text-center'}>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{w.id}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{w.date}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>${(w.amount).toFixed(2)}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>
                                    {(w.coins).toFixed(8)}
                                </td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{w.processor}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{w.wallet}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>
                                    <span onClick={()=> showUserInfo(w.user_id)}
                                          className={'cursor-pointer hover:text-cyan-800'}>
                                        {w.username}
                                    </span>
                                </td>
                                <td className={'border-b border-gray-200 py-3 px-5'}>
                                    <button onClick={()=> approveWithdrawal(w.id,w.amount)}
                                            className={'py-1 px-4 mx-1 text-green-900 hover:shadow-lg bg-green-50 hover:bg-green-200 text-sm border border-green-500 rounded'}>Approve</button>
                                    <button onClick={()=> rejectWithdrawal(w.id,w.amount)}
                                            className={'py-1 px-4 mx-1 text-rose-800 hover:shadow-lg bg-rose-50 hover:bg-rose-200 text-sm border border-rose-500 rounded'}>Reject</button>
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
export default PendingWithdrawals;