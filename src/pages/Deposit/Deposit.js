import {Alert, InnerHeader, Modal} from "../../components";
import {useEffect, useState} from "react";
import {useStateContext} from "../../context/ContextProvider";
import * as paymentService from "../../services/paymentService";
import {deposit, getCryptoPrice} from "../../services/paymentService";
import {useNavigate} from "react-router-dom";

function Deposit() {
    const redirect = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const {user} = useStateContext();
    const [processors, setProcessors] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState();
    const [minDeposit, setMinDeposit] = useState('');
    const [amount, setAmount] = useState();
    const [coinsAmount, setCoinsAmount] = useState('');
    const [coins, setCoins] = useState([]);
    const [showModal, setShowModal] = useState();

    useEffect(() => {

        paymentService.getProcessors(user.token)
            .then(res => {
                console.log(res.processors)
                setProcessors(res.processors);
            }).catch(err => {
            console.log(err)
        })

        getCryptoPrice().then(res => {

            let btc = res.data.find(c => c.id === 'bitcoin');
            let eth = res.data.find(c => c.id === 'ethereum');
            let ltc = res.data.find(c => c.id === 'litecoin');
            let doge = res.data.find(c => c.id === 'dogecoin');

            const coinsArr = [];

            if (btc && eth && ltc && doge) {
                coinsArr.push({price: ((1 / btc.priceUsd) * 1.05), symbol: btc.symbol});
                coinsArr.push({price: (1 / eth.priceUsd) * 1.05, symbol: eth.symbol});
                coinsArr.push({price: (1 / ltc.priceUsd) * 1.05, symbol: ltc.symbol});
                coinsArr.push({price: (1 / doge.priceUsd) * 1.05, symbol: doge.symbol});

                setCoins(coinsArr);
            }

        }).catch(err => {
            console.log(err)
        })

    }, [])

    const openDepositModal = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const depositAmount = formData.get('amount');
        const processor = formData.get('processor');

        if (!processor) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={`Please, select payment processor!`}/>
                ]);
        } else if (depositAmount < minDeposit) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={`Minimum deposit for ${processor} is $${minDeposit}!`}/>
                ]);
        } else {
            setAmount(depositAmount);

            coins.map(c => {
                if (c.symbol === selectedCurrency) {
                    const theCoinsValue = (c.price * depositAmount).toFixed(8);
                    setCoinsAmount(theCoinsValue);
                }
            })

            setShowModal(true);
        }
    }

    const processDeposit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const address = formData.get('address');

        if (!selectedCurrency) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={`Please, select payment processor!`}/>
                ]);
        }
        else if (amount < minDeposit) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={`Minimum deposit for ${selectedCurrency} is $${minDeposit}!`}/>
                ]);
        }
        else {
            deposit({
                amount,
                wallet: address,
                coins: coinsAmount,
                processor: selectedCurrency
            }, user.token)
                .then(res => {
                    setNotifications(oldNotifications =>
                        [...oldNotifications,
                            <Alert alertType={'Success'}
                                   message={res.message}/>
                        ]);
                    setTimeout(()=>{
                        redirect('/deposit-history');
                    },2000);
                }).catch(err => {
                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Error'}
                               message={err.message}/>
                    ]);
            })
        }

        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_, i) => i !== 0));
        }, 2000);
    }

    const processorChangeHandler = (e) => {

        const processorName = e.currentTarget.value;
        let proc = processors.find(p => p.name === processorName);

        if (proc) {
            setSelectedCurrency(proc.name);
            const min = proc.min_deposit;
            setMinDeposit(min);
        }
    }

    const transferForm = (
        <form id={'modalForm'} onSubmit={processDeposit}>
            <div className={'text-center shadow-lg bg-gray-100 my-3 rounded-lg'}>
                <div>
                    <h3>You need to to transfer exact</h3>

                    <strong className={'text-lg'}> {
                        coins ? coins.map(c => {
                            if (c.symbol === selectedCurrency) {
                                return (c.price * amount).toFixed(8);
                            }
                        }) : 'Loading...'
                    } </strong>

                    <span className={'text-lg text-blue-800 font-bold block'}>{selectedCurrency}</span>

                    <h3 className={'mb-3'}>To Address:</h3>

                    <span className={'px-4 py-2 text-lg border border-gray-200 bg-cyan-100 rounded-lg'}>
                        {
                            processors
                                ? processors.map(p => {
                                    if (p.name === selectedCurrency) {
                                        return p.wallet;
                                    }
                                })
                                : 'Loading...'
                        }
                    </span>


                    <h3 className={'my-3'}>After payment, enter your account number from which you made a payment
                        in the form below and click the confirmation of payment.</h3>

                    <h3 className={'text-rose-700 mb-3'}>NOTE: If you send an amount other than the amount listed it may not be credited to your account!</h3>

                </div>

                <input type="text"
                       name="address"
                       className="text-center block w-full pl-7 pr-12 px-5 py-2 sm:text-lg border-gray-300 rounded-md"
                       placeholder="bc1qm45ghptcmhrlalc9q2ujdn90hhqvued2s3egpv"
                       required
                />
            </div>
        </form>
    )

    return (
        <>
            {
                showModal ? <Modal title={'Confirmation of Payment'}
                                   btnText={'I Made The Payment'}
                                   form={transferForm}
                                   setShowModal={setShowModal}/>
                    : ''
            }
            <InnerHeader title={'Deposit'}/>

            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <form onSubmit={openDepositModal}
                                  className={'my-5 border border-gray-400 bg-gray-200 px-10 py-10 shadow-xl w-full md:w-1/2 mx-auto border border-sky-100 rounded-lg'}>

                                <h3 className={'mb-3 text-xl text-center text-rose-700'}>Min
                                    Deposit: <strong>${minDeposit}</strong></h3>

                                <div>
                                    <label htmlFor="price" className="block text-lg font-medium text-gray-700">
                                        Amount
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">

                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-lg">$</span>
                                        </div>

                                        <input type="text"
                                               name="amount"
                                               className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 px-5 py-2 sm:text-lg border-gray-300 rounded-md"
                                               placeholder="0.00"
                                        />

                                        <div className="absolute inset-y-0 right-0 flex items-center">

                                            <label htmlFor="currency" className="sr-only">
                                                Currency
                                            </label>
                                            <select onChange={processorChangeHandler}
                                                    name="processor"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-lg rounded-md"
                                            >
                                                <option value="">Processor</option>
                                                {
                                                    processors
                                                        ? processors.map(p => <option key={p.id}
                                                                                      value={p.name}>{(p.name).toUpperCase()}</option>)
                                                        : 'Loading...'
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={'mt-4 flex justify-between'}>
                                    <button
                                        className={'text-white font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-xl px-10 py-2 border hover:shadow-lg rounded-lg'}
                                        type={'submit'}>Deposit
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Deposit;