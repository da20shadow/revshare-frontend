import {InnerHeader} from "../../components";

function Edit(){
    const boxStyle = 'shadow-lg border border-gray-300 bg-gray-100 py-5 px-10 rounded-md';
    const inputStyle = 'my-2 py-3 px-5 w-full rounded-md';
    const saveBtn = 'my-2 py-2 px-5 font-bold hover:shadow-lg text-gray-100 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md'
    return (
        <>
            <InnerHeader title={'Edit Profile'} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>

                                {/*Change Password*/}
                                <div className={boxStyle}>
                                    <h2 className="text-center text-2xl font-bold text-gray-600 mb-5">Edit Password</h2>
                                    <form>
                                        <label>Current Password:
                                            <input className={inputStyle} type="password" placeholder={'Current Password'}/>
                                        </label>
                                        <label>New Password:
                                            <input className={inputStyle} type="password" placeholder={'New Password'}/>
                                        </label>
                                        <label>New Password again:
                                            <input className={inputStyle} type="password" placeholder={'New Password again'}/>
                                        </label>
                                        <button className={saveBtn}>Save Changes</button>
                                    </form>
                                </div>

                                {/*Change Email*/}
                                <div className={boxStyle}>
                                    <h2 className="text-center text-2xl font-bold text-gray-600 mb-5">Change Email</h2>
                                    <form>
                                        <label>Current Email:
                                            <input className={inputStyle} type="email" placeholder={'Current Email'}/>
                                        </label>
                                        <label>New Email:
                                            <input className={inputStyle} type="email" placeholder={'New Email'}/>
                                        </label>
                                        <label>New Email again:
                                            <input className={inputStyle} type="email" placeholder={'New Email again'}/>
                                        </label>
                                        <button className={saveBtn}>Save Changes</button>
                                    </form>
                                </div>

                                {/*Change Payment Processors*/}
                                <div className={boxStyle}>
                                    <h2 className="text-center text-2xl font-bold text-gray-600 mb-5">Change Payment Processors</h2>
                                    <form>
                                        <label>BTC Address:
                                            <input className={inputStyle} type="text" placeholder={'BTC'}/>
                                        </label>
                                        <label>ETH Address:
                                            <input className={inputStyle} type="text" placeholder={'ETH'}/>
                                        </label>
                                        <label>LTC Address:
                                            <input className={inputStyle} type="text" placeholder={'LTC'}/>
                                        </label>
                                        <label>Doge Address:
                                            <input className={inputStyle} type="text" placeholder={'Doge'}/>
                                        </label>
                                        <label>Tron Address:
                                            <input className={inputStyle} type="text" placeholder={'Tron'}/>
                                        </label>

                                        <button className={saveBtn}>Save Changes</button>
                                    </form>
                                </div>



                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Edit;