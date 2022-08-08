import {InnerHeader} from "../../components";
import loginIcon from '../../assets/img/login-icon.png';
import {Link} from "react-router-dom";

function Login(){
    return (
        <>
            <InnerHeader title={'Login'} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <form className={'mt-10 bg-gray-200 px-10 py-10 shadow-xl w-full md:w-1/2 mx-auto border border-sky-100 rounded-lg'}>
                                <img style={{margin:'-100px auto 0'}}
                                     className={'mx-auto'}
                                     src={loginIcon} alt="Login Icon"/>

                                <div className={'mt-5 mb-3'}>
                                    <label className={'text-lg'} htmlFor="">Username:</label>
                                    <input className={'w-full px-5 py-2 rounded-lg'}
                                           name={'username'}
                                           type="text"
                                           placeholder={'Username'}/>
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
                                        <Link className={'text-gray-500 hover:text-sky-700'} to={'/register'}>Sign up</Link>
                                        <span> | </span>
                                        <Link className={'text-gray-500 hover:text-sky-700'} to={'/forgot'}>Forgot Password?</Link>
                                    </div>
                                    <button className={'text-white font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-xl px-10 py-2 border hover:shadow-lg rounded-lg'} type={'submit'}>Login</button>
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