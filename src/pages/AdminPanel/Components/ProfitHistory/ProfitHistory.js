import AdminMenu from "../AdminMenu";
import {InnerHeader} from "../../../../components";
import {useEffect, useState} from "react";
import {GiMoneyStack} from "react-icons/gi";
import {getProfitHistory} from "../../../../services/sharesService";
import {useStateContext} from "../../../../context/ContextProvider";
import {useNavigate} from "react-router-dom";

function ProfitHistory() {
    const {user, logoutUser} = useStateContext();
    const redirect = useNavigate();
    const [dividends, setDividends] = useState([]);
    const [profitPaid, setProfitPaid] = useState(0);

    useEffect(() => {
        getProfitHistory(user.token).then(res => {
            setDividends(res.dividends);
            setProfitPaid(res.total);
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1500)
            }
        })
    },[])

    return (
        <>
            <InnerHeader title={'Profit History'}/>
            <AdminMenu/>

            <div className={'flex justify-center my-8'}>
                <div className={'px-8 py-4 bg-rose-50 border shadow-lg text-center rounded-xl'}>
                    <div className={'flex justify-center items-center text-rose-700'}>
                        <GiMoneyStack size={'24px'}/>
                        <h3 className={'ml-1 font-bold text-xl text-rose-700'}>${profitPaid.toFixed(2)}</h3>
                    </div>
                    <p className={'text-gray-600'}>Profit Paid</p>
                </div>
            </div>

            <div style={{'overflowX': "auto"}} className={'m-8'}>
                <table className={'w-full'}>

                    <thead className={'bg-sky-700 text-white'}>
                    <tr>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Week</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Amount</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Return</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        dividends.map(d => (
                            <tr key={d.id} className={'hover:bg-gray-100 text-center'}>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.id}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>${(d.amount).toFixed(2)}</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{(d.percent).toFixed(2)}%</td>
                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.date}</td>
                            </tr>
                        ))
                    }

                    </tbody>

                </table>
            </div>
        </>
    )
}

export default ProfitHistory;