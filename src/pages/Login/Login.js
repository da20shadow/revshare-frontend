import {InnerHeader} from "../../components";
import loginIcon from '../../assets/img/login-icon.png';
import {Link, useNavigate} from "react-router-dom";
import {invalidUserInputs} from "../../utils/validators";
import {login} from "../../services/userService";
import {useStateContext} from "../../context/ContextProvider";

function Login() {

    const {isLogged,loginUser} = useStateContext();

    const redirect = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {email, password} = Object.fromEntries(formData);
        if (!invalidUserInputs({email, password})) {
            return;
        }
        login({email, password}).then(user => {
            loginUser(user);
            setTimeout(() => {
                redirect('/account');
            }, 1000);
        }).catch(err => {
            console.log(err.message);
            //TODO show notification
        })
    }

    return (
        <>
            <InnerHeader title={'Login'}/>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <form onSubmit={loginHandler}
                                className={'mt-10 bg-gray-200 px-10 py-10 shadow-xl w-full md:w-1/2 mx-auto border border-sky-100 rounded-lg'}>
                                <img style={{margin: '-100px auto 0'}}
                                     className={'mx-auto'}
                                     src={loginIcon} alt="Login Icon"/>

                                <div className={'mt-5 mb-3'}>
                                    <label className={'text-lg'}>Email:</label>
                                    <input className={'w-full px-5 py-2 rounded-lg'}
                                           name={'email'}
                                           type="email"
                                           placeholder={'Email'}/>
                                </div>
                                <div className={'my-3'}>
                                    <label className={'text-lg'} htmlFor="">Password:</label>
                                    <input className={'w-full px-5 py-2 rounded-lg'}
                                           name={'password'}
                                           type="password"
                                           placeholder={'Password'}/>
                                </div>

                                <div className={'mt-4 flex justify-between'}>
                                    <div className={'mb-3 text-lg'}>
                                        <Link className={'text-gray-500 hover:text-sky-700'} to={'/register'}>Sign
                                            up</Link>
                                        <span> | </span>
                                        <Link className={'text-gray-500 hover:text-sky-700'} to={'/forgot'}>Forgot
                                            Password?</Link>
                                    </div>
                                    <button
                                        className={'text-white font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-xl px-10 py-2 border hover:shadow-lg rounded-lg'}
                                        type={'submit'}>Login
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;