import {InnerHeader} from "../../components";
import './Account.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useStateContext} from "../../context/ContextProvider";

function Account(){
    const {accountStat,setAccountStat} = useStateContext();

    useEffect(()=>{

    })

    return (
        <>
            <InnerHeader title={'Account'} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'my-5 flex flex-wrap justify-around'}>

                                <div className={'account-box'}>
                                    <h3>$<span>{accountStat.balance}</span></h3>
                                    <p>Account Balance</p>
                                    <div>
                                        <Link to={'/deposit'} className={'buy-btn'}>Add Funds</Link>
                                        <Link to={'/withdrawal'} className={'sell-btn'}>Withdrawal</Link>
                                    </div>
                                </div>

                                <div className={'account-box'}>
                                    <h3>{accountStat.shares}</h3>
                                    <p>Total Shares</p>
                                    <div>
                                        <Link to={'/buy-shares'} className={'buy-btn'}>Buy</Link>
                                        <Link to={'/sell-shares'} className={'sell-btn'}>Sell</Link>
                                    </div>
                                </div>

                                <div className={'account-box'}>
                                    <h3>$<span>{accountStat.withdrawals}</span></h3>
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