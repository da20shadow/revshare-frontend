import {InnerHeader} from "../../components";
import {useNavigate} from 'react-router-dom';
import AffStatistics from "./Components/AffStatistics";
import RefList from "./Components/RefList";
import {useStateContext} from "../../context/ContextProvider";

function Affiliates(){
    const {user} = useStateContext();
    const redirect = useNavigate();
    const refLink = `https://lucrative-shares.com/ref=${user.id}`;
    const btnStyle = 'mx-3 py-3 px-10 font-bold text-lg text-gray-100 hover:shadow-lg border border-gray-400 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md';

    return (
        <>
            <InnerHeader title={'Affiliates'} />

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <AffStatistics />

                            {/*Aff Link*/}
                            <div className={'flex justify-center lg:justify-between flex-wrap my-10'}>
                                <div className={'my-10 py-2 px-3 w-full md:w-3/4 bg-gray-100 flex items-center flex-wrap md:flex-nowrap mx-auto text-lg border border-gray-200'}>
                                    <h3 className={'mx-2 font-bold text-sky-900 whitespace-nowrap'}>Affiliate Link:</h3>
                                    <input className={'mx-2 py-2 px-3 w-full'} type="text" value={refLink} readOnly />
                                    <button className={'mx-2 px-3 py-2 font-bold bg-white border border-gray-300 hover:shadow-md rounded-md'}>Copy</button>
                                </div>
                                <div className={'flex items-center'}>
                                    <button onClick={()=> redirect('/promo-tools')} className={btnStyle}>Promo Materials</button>
                                </div>
                            </div>

                            <RefList />

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Affiliates;