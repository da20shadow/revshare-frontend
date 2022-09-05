import {useEffect, useState} from "react";
import {useStateContext} from "../../../../context/ContextProvider";
import {useNavigate} from "react-router-dom";
import {getProfitHistory} from "../../../../services/sharesService";
import {AiOutlineInfoCircle} from "react-icons/ai";

function Statistics() {

    const {user, logoutUser} = useStateContext();
    const redirect = useNavigate();
    const [profitPaid, setProfitPaid] = useState(0.0);
    const [avgReturn, setAvgReturn] = useState(0.0);

    useEffect(() => {
        getProfitHistory().then(res => {
            console.log(res.dividends);
            let dividends = res.dividends;
            let weeks = dividends.length;
            let lastYearProfit = 0;
            dividends.forEach(d => {
                lastYearProfit += d.percent;
            })
            let avgWeeklyReturn = lastYearProfit / weeks;
            let avgMonthlyReturn = avgWeeklyReturn * 4;
            let avgYearlyReturn = avgMonthlyReturn * 12;

            setAvgReturn(avgYearlyReturn);
            setProfitPaid(res.total);
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1500)
            }
        })
    }, [])

    useEffect(() => {
        //TODO: get total withdrawals, total members!
    }, [])

    const statBoxStyle = 'px-10 py-5 mx-6 text-center'
    return (
        <div className={'w-3/4 pt-5 flex flex-wrap justify-center mx-auto'}>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>2 456</h3>
                <span className={'text-md font-bold uppercase text-gray-400'}>Investors</span>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>${(profitPaid).toFixed(2)}</h3>
                <span className={'text-md font-bold uppercase text-gray-400'}>Profit Paid</span>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>{(avgReturn).toFixed(2)}%</h3>
                <span className={'text-md font-bold uppercase text-gray-400 flex items-center flex-nowrap'}>
                    <AiOutlineInfoCircle size={'22px'} className={'mr-1'}
                                         title={'Annual Percentage Rate'} />
                    APR</span>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>01/11/2020</h3>
                <span className={'text-md font-bold uppercase text-gray-400'}>Launch Date</span>
            </div>

        </div>
    )
}

export default Statistics;