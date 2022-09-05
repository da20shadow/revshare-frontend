import {Alert, InnerHeader} from "../../components";
import {useEffect, useState} from "react";
import {useStateContext} from "../../context/ContextProvider";
import * as paymentService from "../../services/paymentService";
import {getAccountStat} from "../../services/userService";
import {useNavigate} from "react-router-dom";

function Withdrawal() {
    const redirect = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const {user, accountStat, setAccountStat, logoutUser} = useStateContext();
    const [processors, setProcessors] = useState();
    const [minWithdrawal, setMinWithdrawal] = useState('');
    const [amount, setAmount] = useState('');
    const [fee, setFee] = useState('');
    const [willGet, setWillGet] = useState('0.00');
    const [disabledBtn,setDisabledBtn] = useState(true);

    useEffect(() => {

        paymentService.getProcessors(user.token).then(res => {
            setProcessors(res.processors);
        }).catch(err => {
            console.log(err)
        })

        if (!accountStat.balance) {
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

    const amountChangeHandler = (e) => {
        let currentAmount = e.currentTarget.value;

        if (currentAmount === '') {
            setAmount(accountStat.balance ? accountStat.balance : '');
            alert('Please, enter valid withdrawal Amount!!!');
            return;
        }
        setAmount(currentAmount);

        if (!fee) {
            return;
        }

        if (currentAmount >= minWithdrawal) {
            let withdrawalSum = Math.max(Number(currentAmount) - Number(fee), 0)
            setWillGet(withdrawalSum.toFixed(2));
            setDisabledBtn(false);
            return;
        }
        setWillGet('0.00');
        setDisabledBtn(true);
    }

    const processorChangeHandler = (e) => {

        const processor = e.currentTarget.value;
        let proc = processors.find(p => p.name === processor);
        if (proc) {
            const min = proc.min_withdrawal;
            const theFee = proc.fees;
            setMinWithdrawal(min);
            setFee(theFee);

            if (amount >= min) {
                let withdrawalSum = Math.max(Number(amount) - Number(theFee), 0)
                console.log('will get:', withdrawalSum)
                setWillGet(withdrawalSum.toFixed(2));
                setDisabledBtn(false);
            } else {
                setWillGet('0.00');
                setDisabledBtn(true);
            }
        }
    }

    const processWithdrawal = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {amount, processor} = Object.fromEntries(formData);
        console.log('Amount', amount)
        console.log('Processor', processor)

        if (accountStat.balance < amount) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                                   message={'Not enough balance, you have only: $'
                                   + (accountStat.balance).toFixed(2)}/>
                ]);
            setTimeout(() => {
                setNotifications(oldNotifications =>
                    oldNotifications.filter((_,i)=> i !== 0));
            },2000)
            return;
        }

        paymentService.processWithdrawal({amount,processor},user.token)
            .then(r => {
                console.log(r)
                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Success'}
                               message={r.message}/>
                    ]);
            })
            .catch(err => {
                console.log(err)
                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Error'}
                               message={err.message}/>
                    ]);
            })

        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_,i)=> i !== 0));
        },2000);

    }
    return (
        <>
            <InnerHeader title={'Withdrawal'}/>

            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <form onSubmit={processWithdrawal}
                                  className={'my-5 border border-gray-300 bg-gray-200 px-10 py-10 shadow-xl w-full md:w-1/2 mx-auto border border-sky-100 rounded-lg'}>

                                <h3 className={'mb-3 text-xl text-center text-rose-700'}>Min
                                    Withdrawal: <strong>${minWithdrawal}</strong></h3>

                                <div>
                                    <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
                                        Amount
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-lg">$</span>
                                        </div>
                                        <input onChange={amountChangeHandler}
                                               type="text"
                                               name="amount"
                                               className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 px-5 py-2 sm:text-lg border-gray-300 rounded-md"
                                               placeholder="0.00"
                                               value={amount}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label htmlFor="processor" className="sr-only">
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

                                <div className={'my-3 flex justify-between py-1 px-3 border bg-gray-100'}>

                                    <h4 className={'text text-center text-gray-700'}>
                                        Fee: <strong className={'text-rose-700'}>${Number(fee).toFixed(2)}</strong></h4>
                                    <h4 className={'text text-center text-gray-700'}>
                                        You will get: <strong className={'text-green-800'}>${willGet}</strong></h4>

                                </div>


                                <div className={'mt-4 flex justify-between'}>
                                    <button disabled={disabledBtn}
                                        className={`${disabledBtn 
                                            ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 ' 
                                            : 'bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:shadow-lg '} 
                                            font-bold text-xl px-10 py-2 border rounded-lg`}
                                        type={'submit'}>Withdrawal
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

export default Withdrawal;