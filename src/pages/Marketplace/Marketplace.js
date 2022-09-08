import {Alert, InnerHeader, Modal} from "../../components";
import './Marketplace.css';
import {useEffect, useState} from "react";
import {buy, getAll} from "../../services/sharesService";
import {useStateContext} from "../../context/ContextProvider";
import BuySharesForm from "./Components/BuySharesForm";
import SharesList from "./Components/SharesList";
import {useNavigate} from "react-router-dom";

function Marketplace() {
    const redirect = useNavigate();
    const {user,isLogged,logoutUser,accountStat} = useStateContext();
    const [shares, setShares] = useState();
    const [avgSharePrice, setAvgSharePrice] = useState('0.9853');
    const [totalShares, setTotalShares] = useState();
    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [notification,setNotification] = useState();

    useEffect(() => {
        getAll(user.token).then(res => {

            setShares(res.shares);
            setTotalShares(res.total);
            let sum = 0;
            let totalOrders = res.shares.length;
            res.shares.forEach(s => {
                sum += s.price;
            })
            const avgPrice = (sum / totalOrders).toFixed(4);
            setAvgSharePrice(avgPrice);

        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!'){
                logoutUser();
                setTimeout(()=>{
                    redirect('/login')
                },1000)
            }
        })
    }, [totalShares])

    return (

        <>
            <InnerHeader title={'Marketplace'}/>

            {
                showModal ? <Modal title={`Buy From Order ID: ${order.id}`}
                                   setShowModal={setShowModal}
                                   btnText={'Buy'}
                                   form={<BuySharesForm order={order}
                                                        setOrder={setOrder}
                                                        totalShares={totalShares}
                                                        setTotalShares={setTotalShares}
                                                        accountStat={accountStat}
                                                        user={user}
                                                        isLogged={isLogged}
                                                        logoutUser={logoutUser}
                                                        setNotification={setNotification}
                                        />}
                            />
                    : ''
            }
            <div className={'z-50 fixed top-16 right-10'}>
                {notification ? notification : ''}
            </div>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">


                        <div className={'px-10 py-5 mb-10 border rounded-md shadow-lg'}>
                            <div className={'bg-gray-200 rounded-md'}>
                                <h2 className={'py-5 text-center text-2xl text-gray-700'}>
                                    Available Shares in Marketplace:
                                    <strong> {totalShares ? totalShares : 'Loading...'}</strong>
                                </h2>
                                <p className={`text-center pb-3 text-gray-700 py-3 px-5 w-fit 
                                mx-auto border bg-gray-50`}>Average Share Price
                                    <strong className={'text-cyan-800'}> ${avgSharePrice}</strong></p>
                            </div>
                        </div>

                        <SharesList shares={shares}
                                    setShares={setShares}
                                    setOrder={setOrder}
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    user={user} />

                    </div>
                </div>
            </main>
        </>
    )
}

export default Marketplace;