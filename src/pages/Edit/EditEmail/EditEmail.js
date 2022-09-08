import {Alert} from "../../../components";
import {update} from "../../../services/userService";
import {useNavigate} from "react-router-dom";

function EditEmail(
    {
        styles,
        user,
        logoutUser,
        setNotifications
    }
){

    const redirect = useNavigate();
    const changeEmailHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {email,newEmail,newEmailAgain} = Object.fromEntries(formData);

        if (!user.email){
            redirect('/login')
        }

        if (newEmail !== newEmailAgain) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'New email and new email again does not match!'}/>
                ]);
        }

        update({email,newEmail},user.token)
            .then(res => {
                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Success'}
                               message={res.message}/>
                    ]);
            }).catch(err => {
            if (err.message === 'Invalid or Expired Token!'){
                logoutUser();
                redirect('/login')
                return;
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
        }, 2000);
    }

    return(
        <div className={styles.boxStyle}>

            <h2 className="text-center text-2xl font-bold text-gray-600 mb-5">Change Email</h2>

            <form onSubmit={changeEmailHandler}>
                <label>Current Email:
                    <input className={styles.inputStyle}
                           name={'email'}
                           type="email"
                           defaultValue={user.email}
                           placeholder={'Current Email'}/>
                </label>
                <label>New Email:
                    <input className={styles.inputStyle}
                           name={'newEmail'}
                           type="email"
                           placeholder={'New Email'}/>
                </label>
                <label>New Email again:
                    <input className={styles.inputStyle}
                           name={'newEmailAgain'}
                           type="email"
                           placeholder={'New Email again'}/>
                </label>
                <button className={styles.saveBtn}>Save Changes</button>
            </form>
        </div>
    )
}
export default EditEmail;