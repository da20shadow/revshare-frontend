import {InnerHeader} from "../../components";

function Contact () {
    const linkStyle = 'font-bold text-sky-700 hover:text-sky-800 hover:underline';
    return (
        <>
            <InnerHeader title={'Contact us'} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">
                            <h2 className={'text-center text-2xl text-gray-600 mb-5'}>
                                If you have a questions you can use the support form below or use our social groups.
                            </h2>

                            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6'}>

                                <div className={'grid grid-cols-1 gap-4'}>

                                    <form className={'w-full pb-10 px-5 bg-gray-200 border border-gray-300 mx-auto my-5 shadow-xl text-lg rounded-md'}>

                                        <h3 className={'text-xl text-gray-700 font-bold my-5'}>Support Form</h3>

                                        <div className={'mb-3'}>
                                            <input className={'py-2 px-5 w-full rounded-md'}
                                                   type="text" placeholder={'Topic...'} required />
                                        </div>

                                        <div className={'mb-3'}>
                                            <textarea name="message"
                                                      className={'py-2 px-5 w-full rounded-md'}
                                                      placeholder={'Enter your message...'} required />
                                        </div>

                                        <div className={'mb-3'}>
                                            <input className={'py-2 px-5 w-full rounded-md'}
                                                   type="text" placeholder={'Name'} required />
                                        </div>

                                        <div className={'mb-10'}>
                                            <input className={'py-2 px-5 w-full rounded-md'}
                                                   type="email" placeholder={'Email'} required />
                                        </div>

                                        {/*TODO: add captcha!*/}
                                        <div className={'flex justify-between'}>
                                            <select name="category" className={'py-3 px-5 bg-white w-full rounded-md'}>
                                                <option value="general">General</option>
                                                <option value="general">Financial</option>
                                                <option value="general">Partnership</option>
                                                <option value="general">Advertising</option>
                                            </select>

                                            <button className={'w-full mx-5 rounded-md font-bold text-gray-100 hover:shadow-lg bg-gradient-to-r from-orange-400 to-orange-600'}
                                                    type={'submit'}>Send Message</button>
                                        </div>

                                    </form>
                                </div>

                                <div className={'rounded my-5 px-5'}>

                                    <h3 className={'text-xl font-bold text-gray-700'}>Contacts and Social Channels</h3>

                                    <p className={'my-5 text-md'}>Email:
                                        <a className={linkStyle} href="#"> support@lucrative-shares.com</a>
                                    </p>

                                    <p className={'my-5 text-md'}>Telegram Support:
                                        <a className={linkStyle} href="#"> @djent</a>
                                    </p>

                                    <p className={'my-5 text-md'}>Telegram Channel:
                                        <a className={linkStyle} href="#"> @lucrative-shares</a>
                                    </p>

                                    <p className={'my-5 text-md'}>Telegram Chat:
                                        <a className={linkStyle} href="#"> @lucrative-shares-group</a>
                                    </p>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Contact;