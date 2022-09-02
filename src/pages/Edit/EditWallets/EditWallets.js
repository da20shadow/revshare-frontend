import * as paymentService from "../../../services/paymentService";
import {Alert} from "../../../components";

function EditWallets(
    {
        styles,processors,wallets,setNotifications,user,logoutUser
    }
) {

    const changeWalletAddress = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const changedWallets = {};
        processors.forEach(p => {
            let processor = (p.name).toLowerCase();
            changedWallets[processor] = formData.get(processor);
        })

        console.log(changedWallets);

        paymentService.updateProcessors(changedWallets,user.token)
            .then(res => {

                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Success'}
                               message={res.message}/>
                    ]);

            }).catch(err => {
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
        <div className={styles.boxStyle}>
            <h2 className="text-center text-2xl font-bold text-gray-600 mb-5">Change Payment
                Processors</h2>
            <form onSubmit={changeWalletAddress}>
                {
                    processors ?
                        processors.map(p => {

                            let wallet = wallets.find(w=> w.processor_id === p.id);
                            return (<label key={p.id}>{p.name} Address:
                                <input className={styles.inputStyle}
                                       name={(p.name).toLowerCase()}
                                       type="text"
                                       defaultValue={wallet ? wallet.address : ''}
                                       placeholder={p.name}/>
                            </label>)
                        })
                        : ''
                }
                <button type={'submit'} className={styles.saveBtn}>Save Changes</button>
            </form>
        </div>
    )
}
export default EditWallets;