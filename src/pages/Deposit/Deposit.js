import {InnerHeader} from "../../components";
import {GiSandsOfTime} from 'react-icons/gi';
import {BsCheckLg} from 'react-icons/bs';

function Deposit(){
    return (
        <>
            <InnerHeader title={'Deposit'} />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <form className={'my-5 border border-gray-300 bg-gray-200 px-10 py-10 shadow-xl w-full md:w-1/2 mx-auto border border-sky-100 rounded-lg'}>

                                <h3 className={'mb-3 text-xl text-center text-rose-700'}>Min Deposit: <strong>$50</strong></h3>

                                <div>
                                    <label htmlFor="price" className="block text-lg font-medium text-gray-700">
                                        Amount
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-lg">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="price"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 px-5 py-2 sm:text-lg border-gray-300 rounded-md"
                                            placeholder="0.00"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label htmlFor="currency" className="sr-only">
                                                Currency
                                            </label>
                                            <select
                                                id="currency"
                                                name="currency"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-lg rounded-md"
                                            >
                                                <option value={'btc'}>BTC</option>
                                                <option value={'eth'}>ETH</option>
                                                <option value={'ltc'}>LTC</option>
                                                <option value={'doge'}>Doge</option>
                                                <option value={'tron'}>Tron</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={'mt-4 flex justify-between'}>
                                    <button className={'text-white font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-xl px-10 py-2 border hover:shadow-lg rounded-lg'} type={'submit'}>Deposit</button>
                                </div>

                            </form>

                            <div className={'mt-10'}>

                                <h2 className={'my-5 text-center text-3xl text-gray-700'}>Deposits History:</h2>

                                <div style={{'overflow-x': "auto"}}>
                                    <table className={'w-full'}>

                                        <thead className={'bg-sky-700 text-white'}>
                                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Date</th>
                                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Amount</th>
                                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Processor</th>
                                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Status</th>
                                        </thead>

                                        <tbody>
                                        <tr className={'hover:bg-gray-100 text-center'}>
                                            <td className={'border border-gray-200 py-3 px-5'}>23/05/2022</td>
                                            <td className={'border border-gray-200 py-3 px-5'}>$100.00</td>
                                            <td className={'border border-gray-200 py-3 px-5'}>BTC</td>
                                            <td className={'border border-gray-200 py-3 px-5'}>
                                                <span className={'flex justify-center items-center'} ><GiSandsOfTime/> Pending</span>
                                            </td>
                                        </tr>
                                        <tr className={'hover:bg-gray-100 text-center'}>
                                            <td className={'border border-gray-200 py-3 px-5'}>15/05/2022</td>
                                            <td className={'border border-gray-200 py-3 px-5'}>$150.00</td>
                                            <td className={'border border-gray-200 py-3 px-5'}>BTC</td>
                                            <td className={'border border-gray-200 py-3 px-5'}>
                                                <span className={'flex justify-center items-center'} ><BsCheckLg /> Completed</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Deposit;