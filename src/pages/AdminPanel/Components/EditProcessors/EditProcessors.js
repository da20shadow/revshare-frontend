import {Alert, InnerHeader} from "../../../../components";
import AdminMenu from "../AdminMenu";
import {useEffect, useState} from "react";
import * as paymentService from "../../../../services/paymentService";
import {useStateContext} from "../../../../context/ContextProvider";
import {useNavigate} from "react-router-dom";

function EditProcessors() {
    const redirect = useNavigate();
    const {user,logoutUser} = useStateContext();
    const [processors,setProcessors] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        paymentService.getProcessors(user.token).then(res => {
            setProcessors(res.processors);
        }).catch(err => {
            if (err.message === 'Invalid or Expired Token!'){
                logoutUser();
                setTimeout(()=>{
                    redirect('/login')
                },1000)
            }
        })

    }, [])

    const changeWalletAddress = (e) => {
        e.preventDefault();

        if (user.role !== 1){
            redirect('/login');
        }

        const formData = new FormData(e.currentTarget);

        const changedWallets = {};
        processors.forEach(p => {
            let processor = (p.name).toLowerCase();
            changedWallets[processor] = formData.get(processor);
        })

        console.log(changedWallets);

        //TODO: make the code below work and change the wallets
        // paymentService.updateProjectProcessors(changedWallets,user.token)
        //     .then(res => {
        //
        //         setNotifications(oldNotifications =>
        //             [...oldNotifications,
        //                 <Alert alertType={'Success'}
        //                        message={res.message}/>
        //             ]);
        //
        //     }).catch(err => {
        //     console.log(err)
        //     setNotifications(oldNotifications =>
        //         [...oldNotifications,
        //             <Alert alertType={'Error'}
        //                    message={err.message}/>
        //         ]);
        // })
        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_,i)=> i !== 0));
        },2000);
    }

    const boxStyle = 'w-3/4 mx-auto shadow-lg border border-gray-300 bg-gray-100 py-5 px-10 rounded-md';
    const inputStyle = 'my-2 py-3 px-5 w-full rounded-md';
    const saveBtn = 'my-2 py-2 px-5 font-bold hover:shadow-lg text-gray-100 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md'

    return (
        <>
            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>
            <InnerHeader title={'Edit Project Processor'} />
            <AdminMenu />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                                {/*Change Payment Processors*/}
                                <div className={boxStyle}>
                                    <h2 className="text-center text-2xl font-bold text-gray-600 mb-5">Change Payment
                                        Processors</h2>
                                    <form onSubmit={changeWalletAddress}>
                                        {
                                            processors ?
                                                processors.map(p => {

                                                    return (<label key={p.id}>{p.name} Address:
                                                        <input className={inputStyle}
                                                               name={(p.name).toLowerCase()}
                                                               type="text"
                                                               defaultValue={p.wallet}
                                                               placeholder={p.name}/>
                                                    </label>)
                                                })
                                                : ''
                                        }
                                        <button type={'submit'} className={saveBtn}>Save Changes</button>
                                    </form>
                                </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default EditProcessors;