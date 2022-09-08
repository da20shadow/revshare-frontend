import {Alert, InnerHeader, Modal} from "../../components";
import {useEffect, useState} from "react";
import {useStateContext} from "../../context/ContextProvider";
import {cancel, getUserShares, publish, update} from "../../services/sharesService";
import {getAccountStat} from "../../services/userService";
import {useNavigate} from "react-router-dom";

function SellShares() {
    const redirect = useNavigate();
    const {user, logoutUser, accountStat, setAccountStat} = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const [myOrders, setMyOrders] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const [editOrderId, setEditOrderId] = useState('');

    useEffect(() => {
        getUserShares(user.token).then(res => {
            setMyOrders(res.orders);
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
        })
        if (!accountStat.shares) {
            getAccountStat(user.token).then(stat => {
                setAccountStat(stat);
            }).catch(err => {
                if (err.message === 'Invalid or Expired Token!') {
                    logoutUser();
                    setTimeout(() => {
                        redirect('/login')
                    }, 1000)
                }
            })
        }

    }, [])

    const publishOrder = (e) => {
        e.preventDefault();

        if (!user.email){
            redirect('/login');
        }

        const sharesData = new FormData(e.currentTarget);
        const {quantity, price} = Object.fromEntries(sharesData);

        let isRequestValid = true;
        if (accountStat.shares < 1) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'You have no shares!'}/>
                ]);
            isRequestValid = false;
        } else if (quantity === '' || quantity < 0) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'Invalid Quantity!'}/>
                ]);
            isRequestValid = false;
        } else if (price === '' || price < 0.01) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'Invalid Price!!'}/>
                ]);
            isRequestValid = false;
        }

        if (!isRequestValid) {
            setTimeout(() => {
                setNotifications(oldNotifications =>
                    oldNotifications.filter((_, i) => i !== 0));
            }, 2300);
            return;
        }

        publish({quantity, price}, user.token)
            .then(() => {
                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Success'}
                               message={'Successfully Published Order!'}/>
                    ]);
                setAccountStat(prevState => ({...prevState, shares: prevState.shares - quantity}));

                getUserShares(user.token).then(res => {
                    setMyOrders(res.orders);
                }).catch(err => {
                    if (err.message === 'Invalid or Expired Token!') {
                        logoutUser();
                        setTimeout(() => {
                            redirect('/login')
                        }, 1000)
                    }
                    setNotifications(oldNotifications =>
                        [...oldNotifications,
                            <Alert alertType={'Error'}
                                   message={err.message}/>
                        ]);
                })

            }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={err.message}/>
                ]);
        })
        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_, i) => i !== 0));
        }, 2300);

        setQuantity('');
        setPrice('')
    }

    const editOrderHandler = (orderId) => {
        if (!user.email){
            redirect('/login');
        }
        setShowModal(!showModal);
        setEditOrderId(orderId);
    }

    const editOrder = (e) => {
        e.preventDefault();

        if (!user.email){
            redirect('/login');
        }

        const data = new FormData(e.currentTarget);
        const {price} = Object.fromEntries(data);

        if (price < 0.0001 || editOrderId < 1) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'Please, Enter Valid Price!'}/>
                ]);
            setTimeout(() => {
                setNotifications(oldNotifications =>
                    oldNotifications.filter((_, i) => i !== 0));
            }, 2300);
            return;
        }
        const orderInfo = {
            price,
            orderId: editOrderId
        }

        update(orderInfo, user.token).then(res => {

            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Success'}
                           message={res.message}/>
                ]);
            setMyOrders(prevState => prevState.map(o => {
                if (o.id === editOrderId){
                    o.price = Number(price);
                }
                return o;
            }))
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={err.message}/>
                ]);
        })
        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_, i) => i !== 0));
        }, 2300);
    }

    const cancelOrder = (orderId) => {
        if (orderId < 1) {
            return;
        }

        if (accountStat.balance < 3) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'Not enough balance to cancel the order! The Fee is $3'}/>
                ]);

            setTimeout(() => {
                setNotifications(oldNotifications =>
                    oldNotifications.filter((_, i) => i !== 0));
            }, 2300);
            return;
        }

        cancel(orderId, user.token).then(r => {

            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Success'}
                           message={r.message}/>
                ]);
            setMyOrders(prevState => prevState.filter(o => o.id !== orderId));
            setAccountStat(prevState => (
                {
                    ...prevState,
                    balance: prevState.balance - 1,
                    shares: prevState.shares + r.canceled
                }
            ))
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!') {
                logoutUser();
                setTimeout(() => {
                    redirect('/login')
                }, 1000)
            }
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={err.message}/>
                ]);
        })
        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_, i) => i !== 0));
        }, 2300);
    }

    const quantityChangeHandler = e => {
        let value = e.target.value;
        if (value < 1) {
            value = 1;
        } else if (accountStat.shares === 0) {
            value = 0;
        } else if (value > accountStat.shares) {
            value = accountStat.shares;
        }
        setQuantity(value);
    }
    const priceChangeHandler = e => {
        let value = e.target.value;
        if (value < 0.0001) {
            value = '0.0001';
        }
        setPrice(value);
    }

    const editOrderForm = (
        <form id={'modalForm'} className={'flex justify-center my-5 text-lg'}
              onSubmit={editOrder}>
            <label>
                Change Sell Price:
                <input name={'price'} className={'ml-3 py-1 px-3 border border-gray-300 bg-gray-100 rounded-md'}
                       type="number" step={'0.0001'} placeholder={'$1.0000'}/>
            </label>
        </form>);

    const btnStyle = 'mx-3 py-3 px-10 font-bold text-lg text-gray-100 border border-gray-400 hover:shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';
    const inputStyle = 'py-2 px-5 text-lg border border-gray-500 w-full rounded-md';
    const formStyle = 'mt-5 py-10 px-5 grid grid-cols-1 md:grid-cols-2 bg-gray-100 border border-gray-200';
    const boxStyle = 'my-5 py-10 px-10 w-full border border-gray-300 shadow-lg rounded-md';
    const cancelBtn = 'mx-1 px-3 py-1 text-gray-100 font-bold hover:shadow-lg hover:text-gray-200 text-sm border border-orange-700 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';
    const editBtn = 'mx-1 px-3 py-1 text-gray-100 font-bold hover:shadow-lg hover:text-gray-200 text-sm border border-sky-700 bg-gradient-to-r from-sky-400 to-blue-600 rounded-md';

    return (
        <>
            <InnerHeader title={'Sell Shares'}/>
            {
                showModal ? <Modal setShowModal={setShowModal}
                                   title={`Edit Order ${editOrderId}`}
                                   btnText={'Save Changes'}
                                   form={editOrderForm}/> : ''
            }

            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-3 sm:px-0">
                        <div className="h-fit">

                            <div className={'mb-8 mx-8 py-4 px-8 bg-rose-100 flex justify-center'}>
                                <p className={'text-rose-900'}>
                                    <strong>IMPORTANT: </strong>
                                    You will not get profits for shares published for sale!
                                    Cancel order fee is <strong>$3</strong>
                                </p>
                            </div>

                            <div className={'w-full md:w-3/4 mx-auto'}>
                                <div className={boxStyle}>
                                    <h2 className={'text-2xl text-center'}>Available Shares:
                                        <strong> {accountStat.shares}</strong></h2>

                                    <form className={formStyle} onSubmit={publishOrder}>

                                        <div className={'m-3'}>
                                            <label>Quantity:
                                                <input name={'quantity'}
                                                       onChange={quantityChangeHandler}
                                                       className={inputStyle} type="number"
                                                       placeholder={'1'} value={quantity}/>
                                            </label>
                                        </div>

                                        <div className={'m-3'}>
                                            <label>Sell At Price:
                                                <input name={'price'}
                                                       onChange={priceChangeHandler}
                                                       className={inputStyle} type="number"
                                                       placeholder={'$1.00'}
                                                       step={'0.0001'} value={price}/>
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
                                            <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Published On
                                            </th>
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
                                                            <td className={'border border-gray-200 py-3 px-5'}>{(o.date_published)}</td>
                                                            <td className={'border border-gray-200 py-3 px-5'}>
                                                                <button onClick={() => editOrderHandler(o.id)}
                                                                        className={editBtn}>Edit
                                                                </button>
                                                                <button onClick={() => cancelOrder(o.id)}
                                                                        className={cancelBtn}>Cancel
                                                                </button>
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