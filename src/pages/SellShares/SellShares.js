import {InnerHeader, Modal} from "../../components";
import {useState} from "react";

function SellShares () {
    const [showModal,setShowModal] = useState(false);

    const btnStyle = 'mx-3 py-3 px-10 font-bold text-lg text-gray-100 border border-gray-400 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';
    const inputStyle = 'py-2 px-5 text-lg border border-gray-500 w-full rounded-md';
    const formStyle = 'mt-5 py-10 px-5 grid grid-cols-1 md:grid-cols-2 bg-gray-100 border border-gray-200';
    const boxStyle = 'my-5 py-10 px-10 w-full border border-gray-300 shadow-lg rounded-md';
    const cancelBtn = 'mx-1 px-3 py-1 text-gray-100 font-bold hover:shadow-lg hover:text-gray-200 text-sm border border-orange-700 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';
    const editBtn = 'mx-1 px-3 py-1 text-gray-100 font-bold hover:shadow-lg hover:text-gray-200 text-sm border border-sky-700 bg-gradient-to-r from-sky-400 to-blue-600 rounded-md';


    const orderId = '125';
    const modalForm = (
        <form className={'flex justify-center my-5 text-lg'}>
            <label>
            Change Sell Price:
            <input className={'ml-3 py-1 px-3 border border-gray-300 bg-gray-100 rounded-md'}
                   type="number" step={'0.0001'} placeholder={'$1.0000'}/>
            </label>
        </form>);

    return (
        <>
            <InnerHeader title={'Sell Shares'} />
            {
                showModal ? <Modal setShowModal={setShowModal}
                                   title={`Edit Order ID: ${orderId}`}
                                   btnText={'Save Changes'}
                                   form={modalForm} /> : ''
            }

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'w-full md:w-3/4 mx-auto'}>
                                <div className={boxStyle}>
                                    <h2 className={'text-2xl text-center'}>Available Ad Shares: <strong>569</strong></h2>

                                    <form className={formStyle}>

                                        <div className={'m-3'}>
                                            <label>Quantity:
                                                <input className={inputStyle} type="number" placeholder={'1'}/>
                                            </label>
                                        </div>

                                        <div className={'m-3'}>
                                            <label>
                                                Select Shares Type:
                                                <select name="sharesType" className={inputStyle}>
                                                    <option value="adShares">Ad Shares</option>
                                                    <option value="tradingShares">Trading Shares</option>
                                                </select>
                                            </label>
                                        </div>

                                        <div className={'m-3'}>
                                            <label>Sell At Price:
                                                <input className={inputStyle} type="number" placeholder={'$1.00'} step={'0.0001'}/>
                                            </label>
                                        </div>

                                        <div className={'m-3'}>
                                            <label>Market Price:
                                                <p className={inputStyle}>$1</p>
                                            </label>
                                        </div>

                                        <div className={'m-3'}>
                                            <button className={btnStyle}>Publish</button>
                                        </div>

                                    </form>

                                </div>
                            </div>

                            {/*Pending Orders*/}

                            <div className={'mt-10'}>

                                <h2 className={'my-5 text-center text-3xl text-gray-700'}>Pending Orders</h2>

                                <div style={{'overflow-x': "auto"}}>
                                    <table className={'w-full'}>

                                        <thead className={'bg-sky-700 text-white'}>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>#</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Shares</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Quantity</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Price</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Action</th>
                                        </thead>

                                        <tbody>
                                            <tr className={'hover:bg-gray-100 text-center'}>
                                                <td className={'border border-gray-200 py-3 px-5'}>125</td>
                                                <td className={'border border-gray-200 py-3 px-5'}>Ad Shares</td>
                                                <td className={'border border-gray-200 py-3 px-5'}>150</td>
                                                <td className={'border border-gray-200 py-3 px-5'}>$1.2523</td>
                                                <td className={'border border-gray-200 py-3 px-5'}>
                                                    <button onClick={()=>setShowModal(!showModal)} className={editBtn}>Edit</button>
                                                    <button className={cancelBtn}>Cancel</button>
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
    )
}
export default SellShares;