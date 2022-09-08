import {useEffect, useState} from "react";
import {getProfitHistory} from "../../services/sharesService";
import {useStateContext} from "../../context/ContextProvider";
import {Link, useNavigate} from "react-router-dom";
import {InnerHeader} from "../../components";

function ReturnsHistory() {
    const redirect = useNavigate();
    const {user,logoutUser} = useStateContext();
    const [dividends, setDividends] = useState([]);
    const [avgReturn, setAvgReturn] = useState(0.0);

    useEffect(() => {
        getProfitHistory(user.token).then(res => {
            setDividends(res.dividends);
            let weeks = dividends.length;
            let lastYearProfit = 0;
            dividends.forEach(d => {
                lastYearProfit += d.percent;
            })
            let avgWeeklyReturn = lastYearProfit / weeks;
            let avgMonthlyReturn = avgWeeklyReturn * 4;
            let avgYearlyReturn = avgMonthlyReturn * 12;

            setAvgReturn(avgYearlyReturn);

        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1500)
            }
        })
    },[avgReturn])

    return(
        <>
            <InnerHeader title={'Profit Shared History'} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-3 sm:px-0">
                        <div className="h-fit">

                            <div className={'mb-4 py-4 px-8 bg-green-100 text-green-800 shadow rounded'}>
                                <h3 className={'text-center font-extrabold text-xl'}>
                                    Weekly Return History For the Last Year! APR:
                                    <span className={'text-green-900 underline'}> {avgReturn ? (avgReturn).toFixed(2) : 'Loading...'}%</span>
                                </h3>
                            </div>

                            <div style={{'overflowX': "auto"}} >
                                <table className={'w-full'}>

                                    <thead className={'bg-sky-700 text-white'}>
                                    <tr>
                                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Week</th>
                                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Return %</th>
                                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Date</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        dividends.map(d => (
                                            <tr key={d.id} className={'hover:bg-gray-100 text-center'}>
                                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.id}</td>
                                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{(d.percent).toFixed(2)}%</td>
                                                <td className={'text-sm border-b border-gray-200 py-3 px-5'}>{d.date}</td>
                                            </tr>
                                        ))
                                    }

                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default ReturnsHistory;