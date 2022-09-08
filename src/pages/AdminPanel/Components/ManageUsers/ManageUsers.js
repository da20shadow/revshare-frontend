import {InnerHeader} from "../../../../components";
import AdminMenu from "../AdminMenu";
import {useState} from "react";

function ManageUsers() {
    const [notifications, setNotifications] = useState([]);
    const [users, setUsers] = useState([]);

    return(
        <>
            <div className={'z-50 fixed top-16 right-10'}>
                {notifications
                    ? notifications.map(n => <div key={Math.random()}>{n}</div>)
                    : ''}
            </div>

            <InnerHeader title={'Manage Users'}/>
            <AdminMenu/>
            <div style={{'overflowX': "auto"}} className={'m-8'}>

                <table className={'w-full'}>

                    <thead className={'bg-sky-700 text-white'}>
                    <tr>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>ID</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Username</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Balance</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Shares</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        users.map(u => (
                            <tr key={u.id} className={'hover:bg-gray-100 text-center'}>
                                <td className={'border-b border-gray-200 py-3 px-5'}>{'1'}</td>
                                <td className={'border-b border-gray-200 py-3 px-5'}>{'admin'}</td>
                                <td className={'border-b border-gray-200 py-3 px-5'}>${('1.548').toFixed(2)}</td>
                                <td className={'border-b border-gray-200 py-3 px-5'}>{'shares'}</td>
                                <td className={'border-b border-gray-200 py-3 px-5 flex justify-center'}>
                                    <button>Edit</button>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>

                </table>

            </div>
        </>
    )
}
export default ManageUsers;