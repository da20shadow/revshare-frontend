import {InnerHeader} from "../../components";
import {useNavigate} from 'react-router-dom';
import AffStatistics from "./Components/AffStatistics";
import RefList from "./Components/RefList";
import {useStateContext} from "../../context/ContextProvider";
import {useEffect, useState} from "react";
import {getReferrals} from "../../services/userService";

function Affiliates() {
    const [hiddenPopup, setHiddenPopup] = useState('hidden');
    const [referrals, setReferrals] = useState([]);
    const [commission, setCommission] = useState(0);
    const [copyTitle, setCopyTitle] = useState('Copy to clipboard!');
    const {user, logoutUser} = useStateContext();
    const redirect = useNavigate();

    const refLink = `https://lucrative-shares.com/?ref=${user.id}`;
    const btnStyle = 'mx-3 py-3 px-10 font-bold text-lg text-gray-100 hover:shadow-lg border border-gray-400 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';

    useEffect(() => {
        getReferrals(user.token).then(res => {
            setReferrals(res.referrals);
            setCommission(res.total_commission);
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
        })
    }, [])

    const copyData = () => {
        const refLink = document.getElementById('refLink');
        refLink.select();
        navigator.clipboard.writeText(refLink.value)
            .then(r => {
                setCopyTitle('Copied!')
                setHiddenPopup('')
                setTimeout(() => {
                    setHiddenPopup('hidden')
                    setCopyTitle('Copy to clipboard!')
                }, 2000)
            })

    }
    const hoverCopyBtnHandler = e => {
        setHiddenPopup('')
    }
    const onLeaveCopyBtnHandler = e => {
        if (copyTitle === "Copied!"){
            setTimeout(()=>{
                setHiddenPopup('hidden')
            },2000)
        }else{
            setHiddenPopup('hidden')
        }
    }
    const selectRefLink = (e) => {
        e.currentTarget.select();
    }

    const popupStyle = 'shadow-lg border border-gray-500 absolute bottom-12 bg-gray-900 text-gray-100 px-3 py-2 rounded-lg whitespace-nowrap'
    return (
        <>
            <InnerHeader title={'Affiliates'}/>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            {/*Aff Statistics*/}
                            <AffStatistics totalPurchases={commission * 10}
                                           commission={commission}
                                           totalReferrals={referrals.length}/>

                            {/*Aff Link*/}
                            <div className={'flex justify-center lg:justify-between flex-wrap my-10'}>
                                <div
                                    className={'my-10 py-2 px-3 w-full md:w-3/4 bg-gray-100 flex items-center flex-wrap md:flex-nowrap mx-auto text-lg border border-gray-200'}>
                                    <h3 className={'mx-2 font-bold text-sky-900 whitespace-nowrap'}>Affiliate Link:</h3>
                                    <input id={'refLink'} className={'mx-2 py-2 px-3 w-full'}
                                           onClick={selectRefLink}
                                           type="text" value={refLink} readOnly/>
                                    <div className={'relative'}>
                                        <span className={`${popupStyle} ${hiddenPopup}`}>{copyTitle}</span>
                                        <button onClick={copyData}
                                                onMouseEnter={hoverCopyBtnHandler}
                                                onMouseLeave={onLeaveCopyBtnHandler}
                                                className={'mx-2 px-3 py-2 font-bold bg-white border border-gray-300 hover:shadow-md rounded-md'}>
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                <div className={'flex items-center'}>
                                    <button onClick={() => redirect('/promo-tools')} className={btnStyle}>Promo
                                        Materials
                                    </button>
                                </div>
                            </div>

                            {/*Referrals List*/}
                            <RefList referrals={referrals}/>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Affiliates;