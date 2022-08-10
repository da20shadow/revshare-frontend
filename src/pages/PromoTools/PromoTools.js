import {InnerHeader} from "../../components";
import banner728 from '../../assets/img/banners/728x90.gif';
import banner468 from '../../assets/img/banners/468x60.gif';
import banner125 from '../../assets/img/banners/125x125.gif';

function PromoTools() {
    const refLink = 'https://lucrative-shares.com/ref=username';
    const banner728Link = 'https://lucrative-shares.com/img/banners/728x90.gif';
    const banner468Link = 'https://lucrative-shares.com/img/banners/468x60.gif';
    const banner125Link = 'https://lucrative-shares.com/img/banners/125x125.gif';
    const btnStyle = 'mx-2 px-3 py-2 font-bold bg-white border border-gray-300 hover:shadow-md rounded-md';

    return (
        <>
            <InnerHeader title={'Promotional Tools'}/>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'mb-10 border border-gray-300 shadow-lg'}>

                                {/*Aff Link*/}
                                <div className={'my-10 py-2 px-3 w-full md:w-3/4 bg-gray-100 flex items-center flex-wrap md:flex-nowrap mx-auto text-lg border border-gray-200'}>
                                    <h3 className={'mx-2 font-bold text-sky-900 whitespace-nowrap'}>Affiliate Link:</h3>
                                    <input className={'mx-2 py-2 px-3 w-full'} type="text" value={refLink} readOnly />
                                    <button className={btnStyle}>Copy</button>
                                </div>

                                {/*Banners 728x90*/}
                                <div className={'my-10'}>
                                    <h3 className={'my-5 mx-20 px-10 py-5 bg-gray-200 text-2xl text-center font-bold'}>Banners 728x90</h3>

                                    <div className={'mb-4'}>

                                        <div className={'flex justify-center'}>
                                            <img src={banner728} alt="Banner728x90" width={'728px'} height={'90px'}/>
                                        </div>

                                        <div className={'my-3 py-2 px-3 w-3/4 flex items-center mx-auto text-lg bg-gray-100 border border-gray-200'}>
                                            <input className={'mx-2 py-2 px-3 w-full'} type="text" value={banner728Link} readOnly />
                                            <button className={btnStyle}>Copy</button>
                                        </div>

                                    </div>

                                    <div className={'mb-4'}>

                                        <div className={'flex justify-center'}>
                                            <img src={banner728} alt="Banner728x90" width={'728px'} height={'90px'}/>
                                        </div>

                                        <div className={'my-3 py-2 px-3 w-3/4 flex items-center mx-auto text-lg bg-gray-100 border border-gray-200'}>
                                            <input className={'mx-2 py-2 px-3 w-full'} type="text" value={banner728Link} readOnly />
                                            <button className={btnStyle}>Copy</button>
                                        </div>

                                    </div>

                                </div>

                                {/*Banners 468x60*/}
                                <div className={'my-10'}>
                                    <h3 className={'my-5 mx-20 px-10 py-5 bg-gray-200 text-2xl text-center font-bold'}>Banners 468x60</h3>

                                    <div className={'mb-4'}>

                                        <div className={'flex justify-center'}>
                                            <img src={banner468} alt="Banner468x60" width={'468px'} height={'60px'}/>
                                        </div>

                                        <div className={'my-3 py-2 px-3 w-3/4 flex items-center mx-auto text-lg bg-gray-100 border border-gray-200'}>
                                            <input className={'mx-2 py-2 px-3 w-full'} type="text" value={banner468Link} readOnly />
                                            <button className={btnStyle}>Copy</button>
                                        </div>

                                    </div>

                                </div>

                                {/*Banners 125x125*/}
                                <div className={'my-10'}>
                                    <h3 className={'my-5 mx-20 px-10 py-5 bg-gray-200 text-2xl text-center font-bold'}>Banners 125x125</h3>

                                    <div className={'mb-4'}>

                                        <div className={'flex justify-center'}>
                                            <img src={banner125} alt="Banner125x125" width={'125px'} height={'125px'}/>
                                        </div>

                                        <div className={'my-3 py-2 px-3 w-3/4 flex items-center mx-auto text-lg bg-gray-100 border border-gray-200'}>
                                            <input className={'mx-2 py-2 px-3 w-full'} type="text" value={banner125Link} readOnly />
                                            <button className={btnStyle}>Copy</button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default PromoTools;