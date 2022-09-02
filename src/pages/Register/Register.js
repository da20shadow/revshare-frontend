import {InnerHeader} from "../../components";
import {invalidUserInputs} from "../../utils/validators";
import {register} from "../../services/userService";
import {useNavigate, useParams} from "react-router-dom";

function Register() {
    const invitedBy = useParams();
    console.log(invitedBy)
    const redirect = useNavigate();

    const regHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (formData.get('agree') !== 'on'){
            alert('You must agree with the rules!');
            return;
        }
        const userInputs = Object.fromEntries(formData);

        if (!invalidUserInputs(userInputs)){
            return;
        }

        if (Number.isInteger(invitedBy.id) && invitedBy.id > 0) {
            userInputs['refer_id'] = invitedBy.id;
        }

        register(userInputs).then(()=>{
            setTimeout(()=>{
                redirect('/login');
            },500)
        }).catch(err => {
            console.log(err.message)
            alert(err.message)
            //TODO: add notification
        })
    }

    const labelStyle = 'text-gray-700 text-lg';
    const inputStyle = 'px-5 py-2 mt-2 w-full text-lg rounded-md';
    return (
        <>
            <InnerHeader title={'Register'}/>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <form onSubmit={regHandler}
                                className={'w-full lg:w-4/5 mx-auto shadow-xl rounded-md bg-gray-200 px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-4'}>

                                <label className={labelStyle}>Username:
                                    <input name={'username'}
                                           className={inputStyle}
                                           type="text"
                                           placeholder={'Username'}
                                           required />
                                </label>

                                <label className={labelStyle}>Email:
                                    <input name={'email'}
                                           className={inputStyle}
                                           type="email"
                                           placeholder={'Email'}
                                           required />
                                </label>

                                <label className={labelStyle}>Password:
                                    <input name={'password'}
                                           className={inputStyle}
                                           type="password"
                                           placeholder={'Password'}
                                           required />
                                </label>

                                <label className={labelStyle}>Re-Password:
                                    <input name={'re_password'} className={inputStyle} type="password"
                                           placeholder={'Re-Password'} required />
                                </label>
                                {/*TODO: add captcha*/}

                                <div>
                                    <label className={'text-lg'}>
                                        <input name={'agree'} type="checkbox" className={'h-5 w-5 mx-3'} required />
                                        I agree with the <a className={'font-bold text-sky-700'} href={'/rules'}>rules</a> of the system.
                                    </label>
                                </div>

                                <div className={'flex justify-end'}>
                                    <button className={'text-white font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-xl px-10 py-2 border hover:shadow-lg rounded-lg'}
                                            type={'submit'}>Register
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

export default Register;