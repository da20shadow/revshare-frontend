import {InnerHeader} from "../../components";
import {GiSandsOfTime} from 'react-icons/gi';
import {BsCheckLg} from 'react-icons/bs';
import {MdArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import DepositHistory from "./Components/DepositHistory";

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

                            <DepositHistory />

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Deposit;