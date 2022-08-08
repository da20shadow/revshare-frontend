import {InnerHeader} from "../../components";
import {Link} from "react-router-dom";

function BuyShares(){
    const btnStyle = 'mx-3 py-3 px-10 font-bold text-lg text-gray-100 hover:shadow-lg border border-gray-400 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md';
    const inputStyle = 'py-2 px-5 text-lg border border-gray-500 w-full rounded-md';
    const formStyle = 'mt-5 py-10 px-5 flex justify-between bg-gray-100 border border-gray-200';
    const boxStyle = 'my-5 py-10 px-5 w-full border border-gray-300 shadow-lg rounded-md';
    return (
        <>
            <InnerHeader title={'Buy Shares'} />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={'grid grid-cols-2 gap-8'}>

                                <div className={boxStyle}>
                                    <h2 className={'text-xl text-center'}>Available Ad Shares: <strong>8569</strong></h2>

                                    <form className={formStyle}>

                                        <input className={inputStyle} type="number" placeholder={'1'}/>
                                        <button className={btnStyle}>Buy</button>

                                    </form>

                                </div>

                                <div className={boxStyle}>
                                    <h2 className={'text-xl text-center'}>Available Trading Shares: <strong>4569</strong></h2>

                                    <form className={formStyle}>

                                        <input className={inputStyle} type="number" placeholder={'1'}/>
                                        <button className={btnStyle}>Buy</button>

                                    </form>

                                </div>

                            </div>

                            <div className={boxStyle}>
                                <h2 className={'text-xl text-center'}>Available Shares in Marketplace: <strong>567</strong></h2>

                                <div className={`mt-5 py-10 px-5 flex justify-center bg-gray-100 border border-gray-200`}>

                                    <Link className={btnStyle}
                                          to={'/marketplace'}>Go To Marketplace</Link>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default BuyShares;