import AdminMenu from "../AdminMenu";
import {Alert, InnerHeader} from "../../../../components";
import {useEffect, useState} from "react";
import {getSharesStat, shareDividends} from "../../../../services/sharesService";
import {useStateContext} from "../../../../context/ContextProvider";
import {useNavigate} from "react-router-dom";

function ShareProfit() {
    const redirect = useNavigate();
    const {user,logoutUser} = useStateContext();
    const [notifications, setNotifications] = useState([]);
    const [totalShares, setTotalShares] = useState();
    const [totalOrders, setTotalOrders] = useState();
    const [totalHold, setTotalHold] = useState();
    const [profitPerShare, setProfitPerShare] = useState(0.00);

    useEffect(() => {
        if (user.role !== 1){
            redirect('/login');
        }
        getSharesStat().then(res => {
            setTotalShares(res.total)
            setTotalOrders(res.orders)
            setTotalHold(res.hold)
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!'){
                logoutUser();
                setTimeout(()=>{
                    redirect('/login')
                },1000)
            }
        })
    }, [])

    //TODO: implement AVG price somehow ;d

    const processShareDividend = (e) => {
        e.preventDefault();

        if (user.role !== 1){
            redirect('/login');
        }

        const percentReturn = profitPerShare / (totalHold / 100);
        const data = {
            profitPerShare,
            percentReturn,
            sharedAmount: totalHold * profitPerShare
        };
        shareDividends(data, user.token)
            .then(res => {
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
            if (err.message === 'Invalid or Expired Token!'){
                logoutUser();
                setTimeout(()=>{
                    redirect('/login')
                },1000)
            }
        })
        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_, i) => i !== 0));
        }, 2300);
    }

    const onChangeDividendInput = (e) => {
        const amount = e.currentTarget.value;
        setProfitPerShare(amount / totalHold);
    }
    return (
        <>
            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>
            <InnerHeader title={'Share Profits'}/>
            <AdminMenu/>

            <div className={'m-8 grid grid-cols-3 gap-8'}>

                <div className={'px-4 py-2 shadow-lg border border-gray-200 rounded-lg text-center'}>
                    <h3 className={'text-xl font-bold'}>{totalShares}</h3>
                    <p>Total Issued Shares</p>
                </div>

                <div className={'px-4 py-2 shadow-lg border border-gray-200 rounded-lg text-center'}>
                    <h3 className={'text-xl font-bold'}>{totalOrders}</h3>
                    <p>Shares in Marketplace</p>
                </div>

                <div className={'px-4 py-2 shadow-lg border border-gray-200 rounded-lg text-center'}>
                    <h3 className={'text-xl font-bold'}>{totalHold}</h3>
                    <p>Shares in Accounts</p>
                </div>


            </div>

            <div className={'m-8 flex justify-center'}>

                <form onSubmit={processShareDividend}
                      className={'w-3/4 p-8 bg-gray-100 rounded-lg shadow-lg border border-gray-200'}>

                    <h3 className={'py-4 text-cyan-700 text-2xl font-bold text-center'}>Share Profits To
                        Shareholders!</h3>

                    <div className={'my-3 text-xl flex justify-center items-center'}>
                        <p>Dividend per 1 Share: <strong
                            className={'text-green-800'}>${(profitPerShare).toFixed(4)}</strong></p>

                        <input className={'px-4 py-2 ml-4 text-xl rounded'}
                               onChange={onChangeDividendInput}
                               name={'dividend'}
                               type="number"
                               placeholder={'$100'}
                               required/>
                    </div>

                    <div className={'mt-8 flex justify-center'}>
                        <button
                            className={'py-2 px-4 text-xl border bg-cyan-800 hover:bg-cyan-900 text-cyan-200 rounded-lg hover:shadow-lg'}
                            type={'submit'}>
                            Share Profit
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ShareProfit;