import {update} from "../../../services/userService";
import {Alert} from "../../../components";
import {useNavigate} from "react-router-dom";

function EditPassword(
    {styles, user, logoutUser, setNotifications}
) {
    const redirect = useNavigate();
    const changePasswordHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {oldPassword, newPassword, newPasswordAgain} = Object.fromEntries(formData);

        if (!user.email){
            redirect('/login');
        }
        if (newPassword !== newPasswordAgain) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'New password and New Password again does not match!'}/>
                ]);
        } else if (newPassword.length < 8) {
            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={'Password must be more than 8 characters!'}/>
                ]);
        }else {
            update({password:oldPassword,newPassword},user.token)
                .then(res => {
                    setNotifications(oldNotifications =>
                        [...oldNotifications,
                            <Alert alertType={'Success'}
                                   message={res.message}/>
                        ]);
            }).catch(err => {
                if (err.message === 'Invalid or Expired Token!'){
                    logoutUser();
                    return;
                }
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

    return (
        <div className={styles.boxStyle}>
            <h2 className="text-center text-2xl font-bold text-gray-600 mb-5">Edit Password</h2>
            <form onSubmit={changePasswordHandler}>
                <label>Current Password:
                    <input className={styles.inputStyle}
                           name={'oldPassword'}
                           type="password"
                           placeholder={'Current Password'}/>
                </label>
                <label>New Password:
                    <input className={styles.inputStyle}
                           name={'newPassword'}
                           type="password" placeholder={'New Password'}/>
                </label>
                <label>New Password again:
                    <input className={styles.inputStyle}
                           name={'newPasswordAgain'}
                           type="password"
                           placeholder={'New Password again'}/>
                </label>
                <button type={'submit'} className={styles.saveBtn}>Save Changes</button>
            </form>
        </div>
    )
}

export default EditPassword;