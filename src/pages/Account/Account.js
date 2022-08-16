import {InnerHeader} from "../../components";
import './Account.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useStateContext} from "../../context/ContextProvider";
import {getAccountStat} from "../../services/userService";

function Account(){
    const {user,accountStat,setAccountStat,logoutUser} = useStateContext();
    const redirect = useNavigate();

    useEffect(()=> {
        getAccountStat(user.token).then(stat =>{
            console.log(stat)
            setAccountStat(stat);
        }).catch(err =>{
            if (err.message === 'Invalid or Expired Token!'){
                logoutUser();
                setTimeout(()=>{
                    redirect('/login')
                },1000)
            }
        })
    },[])

    return (
        <>
            <InnerHeader title={'Account'} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <h2 className={'text-center text-2xl mb-10'}>
                                Welcome <strong>{user.username}</strong>!
                            </h2>

                            <div className={'my-5 flex flex-wrap justify-around'}>

                                <div className={'account-box'}>
                                    <h3>$<span>{accountStat ? Number(accountStat.balance).toFixed(2) : 'Loading'}</span></h3>
                                    <p>Account Balance</p>
                                    <div>
                                        <Link to={'/deposit'} className={'buy-btn'}>Add Funds</Link>
                                        <Link to={'/withdrawal'} className={'sell-btn'}>Withdrawal</Link>
                                    </div>
                                </div>

                                <div className={'account-box'}>
                                    <h3>{accountStat ? accountStat.shares : 'Loading...'}</h3>
                                    <p>Total Shares</p>
                                    <div>
                                        <Link to={'/marketplace'} className={'buy-btn'}>Buy</Link>
                                        <Link to={'/sell-shares'} className={'sell-btn'}>Sell</Link>
                                    </div>
                                </div>

                                <div className={'account-box'}>
                                    <h3>$<span>{accountStat ? Number(accountStat.withdrawals).toFixed(2) : 'Loading...'}</span></h3>
                                    <p>Total Withdrawals</p>
                                    <div>
                                        <Link to={'/withdrawal'} className={'sell-btn'}>History</Link>
                                    </div>
                                </div>

                            </div>

                            <div className={'border'}>
                                Banner Ad
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Account;