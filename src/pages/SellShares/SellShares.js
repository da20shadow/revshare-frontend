import {InnerHeader, Modal} from "../../components";
import {useEffect, useState} from "react";
import {useStateContext} from "../../context/ContextProvider";
import {getUserShares, publish} from "../../services/sharesService";

function SellShares () {
    const {user,accountStat} = useStateContext();
    const [showModal,setShowModal] = useState(false);
    const [myOrders,setMyOrders] = useState([]);

    useEffect(()=>{
        getUserShares(user.token).then(res => {
            setMyOrders(res.orders);
            console.log(res)
            console.log(res.orders)
        }).catch(err =>{
            console.log(err)
        })
    },[])

    const btnStyle = 'mx-3 py-3 px-10 font-bold text-lg text-gray-100 border border-gray-400 hover:shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';
    const inputStyle = 'py-2 px-5 text-lg border border-gray-500 w-full rounded-md';
    const formStyle = 'mt-5 py-10 px-5 grid grid-cols-1 md:grid-cols-2 bg-gray-100 border border-gray-200';
    const boxStyle = 'my-5 py-10 px-10 w-full border border-gray-300 shadow-lg rounded-md';
    const cancelBtn = 'mx-1 px-3 py-1 text-gray-100 font-bold hover:shadow-lg hover:text-gray-200 text-sm border border-orange-700 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';
    const editBtn = 'mx-1 px-3 py-1 text-gray-100 font-bold hover:shadow-lg hover:text-gray-200 text-sm border border-sky-700 bg-gradient-to-r from-sky-400 to-blue-600 rounded-md';

    const publishOrder = (e) => {
        e.preventDefault();
        const sharesData = new FormData(e.currentTarget);
        const {quantity,price} = Object.fromEntries(sharesData);

        if (accountStat.shares < 1){
            alert('You have no shares!');
            return;
        }

        if (quantity === '' || quantity < 0){
            alert('Invalid Quantity!');
            return
        }
        if (price === '' || price < 0.01){
            alert('Invalid Price!');
            return;
        }

        publish({quantity,price},user.token)
            .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const modalForm = (
        <form className={'flex justify-center my-5 text-lg'}>
            <label>
            Change Sell Price:
            <input className={'ml-3 py-1 px-3 border border-gray-300 bg-gray-100 rounded-md'}
                   type="number" step={'0.0001'} placeholder={'$1.0000'}/>
            </label>
        </form>);

    const orderId = 12;
    return (
        <>
            <InnerHeader title={'Sell Shares'} />
            {
                showModal ? <Modal setShowModal={setShowModal}
                                   title={`Edit Order ${orderId}`}
                                   btnText={'Save Changes'}
                                   form={modalForm} /> : ''
            }

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'w-full md:w-3/4 mx-auto'}>
                                <div className={boxStyle}>
                                    <h2 className={'text-2xl text-center'}>Available Ad Shares: <strong>{accountStat.shares}</strong></h2>

                                    <form className={formStyle} onSubmit={publishOrder}>

                                        <div className={'m-3'}>
                                            <label>Quantity:
                                                <input name={'quantity'}
                                                       className={inputStyle} type="number"
                                                       placeholder={'1'}/>
                                            </label>
                                        </div>

                                        <div className={'m-3'}>
                                            <label>Sell At Price:
                                                <input name={'price'}
                                                    className={inputStyle} type="number"
                                                       placeholder={'$1.00'} step={'0.0001'}/>
                                            </label>
                                        </div>

                                        <div className={'m-3'}>
                                            <button type={'submit'} className={btnStyle}>Publish</button>
                                        </div>

                                    </form>

                                </div>
                            </div>

                            {/*Pending Orders*/}

                            <div className={'mt-10'}>

                                <h2 className={'my-5 text-center text-3xl text-gray-700'}>Pending Orders</h2>

                                <div style={{'overflowX': "auto"}}>
                                    <table className={'w-full'}>

                                        <thead className={'bg-sky-700 text-white'}>
                                        <tr>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>#</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Quantity</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Price</th>
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Action</th>
                                        </tr>
                                        </thead>

                                        {
                                            myOrders
                                                ?
                                                <tbody>
                                                {
                                                    myOrders.map(o =>
                                                        <tr key={o.id} className={'hover:bg-gray-100 text-center'}>
                                                            <td className={'border border-gray-200 py-3 px-5'}>{o.id}</td>
                                                            <td className={'border border-gray-200 py-3 px-5'}>{o.quantity}</td>
                                                            <td className={'border border-gray-200 py-3 px-5'}>${(o.price).toFixed(4)}</td>
                                                            <td className={'border border-gray-200 py-3 px-5'}>
                                                                <button onClick={()=>setShowModal(!showModal)}
                                                                        className={editBtn}>Edit
                                                                </button>
                                                                <button className={cancelBtn}>Cancel</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>

                                                : ''
                                        }

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