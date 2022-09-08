import {Alert, InnerHeader} from "../../../../components";
import AdminMenu from "../AdminMenu";
import {useNavigate} from "react-router-dom";
import {publishNews} from "../../../../services/newsService";
import {useStateContext} from "../../../../context/ContextProvider";
import {useState} from "react";

function AddNews() {
    const [notifications, setNotifications] = useState([]);
    const {user,logoutUser} = useStateContext();
    const redirect = useNavigate();

    const publishNewsHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {title,description} = Object.fromEntries(formData);

        //TODO: validate data and send to database

        publishNews({title,description},user.token)
            .then(res =>{
                setNotifications(oldNotifications =>
                    [...oldNotifications,
                        <Alert alertType={'Success'}
                               message={res.message}/>
                    ]);
                setTimeout(()=>{
                    redirect('/scradminpanel/manage-news');
                },1000)

        }).catch(err => {

            setNotifications(oldNotifications =>
                [...oldNotifications,
                    <Alert alertType={'Error'}
                           message={err.message}/>
                ]);
            if (err.message === 'Invalid or Expired Token!'){
                logoutUser();
                setTimeout(()=>{
                    redirect('/login')
                },1000)
            }

        })

        setTimeout(() => {
            setNotifications(oldNotifications =>
                oldNotifications.filter((_,i)=> i !== 0));
        }, 1500);

    }
    return (
        <>
            <InnerHeader title={'Add News'}/>

            <AdminMenu/>

            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <form onSubmit={publishNewsHandler}
                  className={'py-8 px-8 my-8 mx-4 bg-gray-100 shadow-lg border border-gray-200 rounded-lg'}>

                <h2 className={'pb-3 text-center text-xl text-cyan-800 font-bold'}>Add News</h2>

                <div className={'my-3'}>
                    <input className={'w-full py-2 px-4'}
                           type="text"
                           name={'title'}
                           placeholder={'News Title'}
                           required/>
                </div>
                <div className={'mb-3'}>
                    <textarea className={'w-full h-96 py-2 px-4'}
                              name={'description'}
                              placeholder={'Description...'}
                              required/>
                </div>

                <button className={'py-2 px-4 bg-cyan-700 font-bold text-xl text-cyan-50 border border-gray-300 rounded-lg hover:shadow-lg'} type={'submit'}>Publish</button>
            </form>

        </>
    )
}

export default AddNews;