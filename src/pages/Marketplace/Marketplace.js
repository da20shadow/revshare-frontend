import {InnerHeader, Modal} from "../../components";
import './Marketplace.css';
import {MdArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import {useState} from "react";

function Marketplace() {
    const [showModal,setShowModal] = useState(false);

    const btnStyle = 'mx-3 py-1 px-5 font-bold text-sm text-gray-100 border border-gray-400 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md';


    const buySharesForm = (
        <>
            <h3 className="text-center text-lg mt-5">Available Shares in this order: <strong>200</strong></h3>
        <form className={'flex justify-center items-center my-5 text-lg'}>
            <label>
                Quantity:
                <input className={'ml-3 py-1 px-3 border border-gray-300 bg-gray-100 rounded-md w-36'}
                       type="number" placeholder={'1'}/>
            </label>
            <div className={'ml-5'}>
                Total: <strong>$12</strong>
            </div>
        </form>
        </>
    );
    return (

        <>
            <InnerHeader title={'Marketplace'}/>

            {
                 showModal ? <Modal title={'Buy Order ID: 1'}
                                    setShowModal={setShowModal}
                                    btnText={'Buy'}
                                    form={buySharesForm} /> : ''
            }

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">


                        <div className={'px-10 py-5 mb-10 border rounded-md shadow-lg'}>
                            <div className={'bg-gray-200 rounded-md'}>
                                <h2 className={'py-5 text-center text-2xl text-gray-700'}>Available Shares in Marketplace: <strong>254</strong></h2>
                            </div>
                        </div>

                        <div className={'flex justify-end'}>
                            <select name="sort" className={'px-5 py-2 rounded-md'} >
                                <option value="">Sort By</option>
                                <option value="adShares">Ad Shares</option>
                                <option value="tradingShares">Trading Shares</option>
                            </select>
                        </div>
                        <div className="h-fit" style={{'overflowX': "auto"}}>

                            <table className={'marketplace-table'}>

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Type</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Net Amount</th>
                                        <th>Commission</th>
                                        <th> </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Ad Share</td>
                                        <td>100</td>
                                        <td>$1.2315</td>
                                        <td>$123.15</td>
                                        <td>$12.315</td>
                                        <td>
                                            <button onClick={()=>setShowModal(!showModal)} className={btnStyle} >Buy</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Ad Share</td>
                                        <td>200</td>
                                        <td>$1.2315</td>
                                        <td>$246.30</td>
                                        <td>$24.630</td>
                                        <td>
                                            <button onClick={()=>setShowModal(!showModal)} className={btnStyle} >Buy</button>
                                        </td>
                                    </tr>
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
                                    <nav
                                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                        aria-label="Pagination">
                                        <a href="#"
                                           className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                            <span className="sr-only">Previous</span>
                                            <MdArrowBackIos/>
                                        </a>
                                        <a href="#" aria-current="page"
                                           className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
                                        <a href="#"
                                           className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                                        <a href="#"
                                           className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
                                        <span
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
                                        <a href="#"
                                           className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
                                        <a href="#"
                                           className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
                                        <a href="#"
                                           className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>
                                        <a href="#"
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
                                        <span className="font-medium"> 97 </span>
                                        results
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default Marketplace;