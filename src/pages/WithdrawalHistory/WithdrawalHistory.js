import {GiSandsOfTime} from "react-icons/gi";
import {BsCheckLg} from "react-icons/bs";
import {MdArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import {InnerHeader} from "../../components";
import {useEffect, useState} from "react";
import {getWithdrawals} from "../../services/paymentService";
import {useStateContext} from "../../context/ContextProvider";

function WithdrawalHistory() {
    const {user} = useStateContext();
    const [withdrawals, setWithdrawals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numOfWithdrawals, setNumOfWithdrawals] = useState();
    const [numOfPages, setNumOfPages] = useState();

    useEffect(() => {
        getWithdrawals(0, user.token).then(res => {
            console.log(res.withdrawals)
            setWithdrawals(res.withdrawals);
            setNumOfWithdrawals(res.total);
            const totalNumD = Math.ceil(res.total / 10);
            setNumOfPages(totalNumD);

        }).catch(err => {
            console.log(err)
        })
    }, [])

    const nextPage = (e) => {
        e.preventDefault();
        //TODO: on mobile not work next
        let newPage = currentPage + 1;
        if (newPage >= numOfPages) {
            return;
        } else {
            const newOffset = 10 * newPage;
            setCurrentPage(newPage);
            getWithdrawals(newOffset, user.token)
                .then(res => {
                setWithdrawals(res.withdrawals);
                setNumOfWithdrawals(res.total);
            }).catch(err => {
                console.log(err.message)
            })
        }
    }
    const prevPage = (e) => {
        e.preventDefault();
        //TODO: on mobile not work prev
        let newPage = currentPage - 1;
        if (newPage < 0) {
            newPage = 0;
        }

        let newOffset = 10 * newPage;
        setCurrentPage(newPage);
        getWithdrawals(newOffset, user.token)
            .then(res => {
                setWithdrawals(res.withdrawals);
                setNumOfWithdrawals(res.total);
        }).catch(err => {
            console.log(err.message)
        })
    }

    return (
        <>
            <InnerHeader title={'Withdrawal History'}/>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'mt-5'}>

                                <div style={{'overflowX': "auto"}}>
                                    <table className={'w-full'}>

                                        <thead className={'bg-sky-700 text-white'}>
                                        <tr>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Date</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Amount</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Processor</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Wallet</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Status</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {
                                            withdrawals
                                                && withdrawals.map(d => (
                                                <tr key={d.id} className={'hover:bg-gray-100 text-center'}>
                                                    <td className={'border-b border-gray-200 py-3 px-5'}>{d.date}</td>
                                                    <td className={'border-b border-gray-200 py-3 px-5'}>${(d.amount).toFixed(2)}</td>
                                                    <td className={'border-b border-gray-200 py-3 px-5'}>{d.processor}</td>
                                                    <td className={'border-b border-gray-200 py-3 px-5'}>{d.wallet}</td>
                                                    <td className={'border-b border-gray-200 py-3 px-5 flex justify-center'}>
                                                        {
                                                            d.status === 2
                                                                ? <span
                                                                    className={'w-fit py-1 px-2 shadow border border-green-300 bg-emerald-200 font-bold text-sm text-green-800 rounded flex justify-center items-center'}>
                                                                        <BsCheckLg/> Completed
                                                                      </span>
                                                                : <span
                                                                    className={'w-fit py-1 px-2 shadow border border-orange-200 bg-amber-100 font-bold text-sm text-orange-800 rounded flex justify-center items-center'}>
                                                                        <GiSandsOfTime/> Pending
                                                                      </span>
                                                        }
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                        </tbody>

                                    </table>
                                </div>

                                {/*Pagination*/}
                                <div
                                    className="mt-5 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">


                                    <div className="flex-1 flex justify-around sm:hidden">
                                        <a href="#"
                                           className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                                        <a href="#"
                                           className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
                                    </div>

                                    <div
                                        className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">

                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                <a href="#" onClick={prevPage}
                                                   className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    <span className="sr-only">Previous</span>
                                                    <MdArrowBackIos/>
                                                </a>

                                                <span
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> <strong>{currentPage + 1}</strong> </span>

                                                <a href="#" onClick={nextPage}
                                                   className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                    <span className="sr-only">Next</span>
                                                    <MdOutlineArrowForwardIos/>
                                                </a>
                                            </nav>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing
                                                <span className="font-medium"> 1 </span>
                                                to
                                                <span className="font-medium"> 10 </span>
                                                of
                                                <span
                                                    className="font-medium"> {numOfWithdrawals ? numOfWithdrawals : 'Loading...'} </span>
                                                results
                                            </p>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </>

    )
}

export default WithdrawalHistory;