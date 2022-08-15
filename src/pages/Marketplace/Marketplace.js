import {InnerHeader, Modal} from "../../components";
import './Marketplace.css';
import {MdArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import {useEffect, useState} from "react";
import {buy, getAll} from "../../services/sharesService";
import {useStateContext} from "../../context/ContextProvider";

function Marketplace() {
    const {user,accountStat} = useStateContext();
    const [shares, setShares] = useState();
    const [totalShares, setTotalShares] = useState();
    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [buyQuantity, setBuyQuantity] = useState(1);

    useEffect(() => {
        getAll(user.token).then(res => {
            console.log(res.shares)
            setShares(res.shares);
            setTotalShares(res.total);
        }).catch(err => {
            console.log(err)
        })
    }, [totalShares])


    const btnStyle = 'mx-3 py-1 px-5 font-bold text-sm text-gray-100 border border-gray-400 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md';

    const buySharesHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {quantity} = Object.fromEntries(formData);

        const totalCost = (quantity * order.price) * 1.1;

        if (totalCost > accountStat.balance){
            alert('Not Enough Money!')
            //TODO: show notification Error not enough balance!
            return;
        }
        const orderOwnerId = order.userId;
        buy(orderOwnerId,quantity,order.id,user.token).then(res =>{
            setTotalShares(totalShares - quantity);
            const newQuantity = order.quantity - quantity;
            setOrder(prevState => ({
                ...prevState,
                quantity: newQuantity
            }))
            console.log('Response:',res)
        }).catch(err => {
            console.log('Error: ',err)
        })
    }

    let buySharesForm = (
        <>
            <h3 className="text-center text-lg mt-5">
                Available Shares in this order:
                <strong> {order.quantity}</strong>
            </h3>
            <form id={'modalForm'} onSubmit={buySharesHandler}
                  className={'flex justify-center items-center my-5 text-lg'}>
                <label>
                    Quantity:
                    <input name={'quantity'}
                           onChange={(e) => setBuyQuantity(() => {
                               try {
                                   const orderQuantity = order.quantity;
                                   let quantity = Number(e.target.value);
                                   if (orderQuantity < quantity) {
                                       return orderQuantity;
                                   } else if (e.target.value <= 0) {
                                       return 1;
                                   } else {
                                       return quantity;
                                   }
                               } catch (err) {
                                   console.log(err)
                                   return 1;
                               }
                           })}
                           className={'ml-3 py-1 px-3 border border-gray-300 bg-gray-100 rounded-md w-36'}
                           type="number" placeholder={'1'} value={buyQuantity} required />
                </label>
                <div className={'ml-5'}>
                    Total: <strong>${((buyQuantity * order.price) * 1.1).toFixed(4)}</strong>
                </div>
            </form>
        </>
    );
    const showOrder = (orderId) => {
        if (!shares) {
            return;
        }
        const order = shares.find(o => o.id === orderId);
        console.log(order)
        setOrder(order);
        setShowModal(!showModal);

    }
    return (

        <>
            <InnerHeader title={'Marketplace'}/>

            {
                showModal ? <Modal title={`Buy From Order ID: ${order.id}`}
                                   setShowModal={setShowModal}
                                   btnText={'Buy'}
                                   form={buySharesForm}/> : ''
            }

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">


                        <div className={'px-10 py-5 mb-10 border rounded-md shadow-lg'}>
                            <div className={'bg-gray-200 rounded-md'}>
                                <h2 className={'py-5 text-center text-2xl text-gray-700'}>
                                    Available Shares in Marketplace:
                                    <strong> {totalShares ? totalShares : 'Loading...'}</strong>
                                </h2>
                            </div>
                        </div>

                        <div className={'flex justify-end'}>
                            <select name="sort" className={'px-5 py-2 rounded-md'}>
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
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Net Amount</th>
                                    <th>Commission</th>
                                    <th> </th>
                                </tr>
                                </thead>

                                { shares ?
                                    <tbody>
                                    {shares.map(s => {
                                        if (s.userId !== user.id){
                                            return (
                                                <tr key={s.id} className={'table-row'}>
                                                <td>{s.id}</td>
                                                <td>{s.quantity}</td>
                                                <td>${(s.price).toFixed(4)}</td>
                                                <td>${(s.quantity * s.price).toFixed(4)}</td>
                                                <td>${((s.quantity * s.price) * 0.10).toFixed(2)}</td>
                                                <td>
                                                    <button onClick={() => showOrder(s.id)} className={btnStyle}>Buy
                                                    </button>
                                                </td>
                                            </tr>)
                                        }
                                    })
                                    }
                                    </tbody>
                                    : ''
                                }
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