import {Alert, InnerHeader} from "../../components";
import {useEffect, useState} from "react";
import {useStateContext} from "../../context/ContextProvider";
import * as paymentService from "../../services/paymentService";
import {deposit} from "../../services/paymentService";

function Deposit() {

    const [notifications, setNotifications] = useState([]);
    const {user} = useStateContext();
    const [processors, setProcessors] = useState();
    const [minDeposit, setMinDeposit] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        paymentService.getProcessors(user.token).then(res => {
            setProcessors(res.processors);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const processDeposit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const depositAmount = formData.get('amount');
        const processor = formData.get('processor');

        if (depositAmount < minDeposit) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={`Minimum deposit for ${processor} is $${minDeposit}!`}/>
                ]);
        } else if (!processor) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={`Please, select payment processor!`}/>
                ]);
        } else {
            deposit({amount: depositAmount, processor}, user.token)
                .then(res => {
                    setNotifications(oldNotifications =>
                        [...oldNotifications,
                            <Alert alertType={'Success'}
                                   message={res.message}/>
                        ]);
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

        const processor = e.currentTarget.value;
        let proc = processors.find(p => p.name === processor);

        if (proc) {
            const min = proc.min_deposit;
            setMinDeposit(min);
        }
    }

    return (
        <>
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

                            <form onSubmit={processDeposit}
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