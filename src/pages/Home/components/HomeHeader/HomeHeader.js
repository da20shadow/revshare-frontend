import {Link} from "react-router-dom";

function HomeHeader(){
    return (
        <section className={'home-header'}>
            <div className={"w-full sm:w-3/4 mx-auto"}>

                <div className={"bg-slate-900 bg-opacity-50 rounded-md py-1 shadow-lg"}>
                    <div className={'border border-white m-3 py-10'}>
                        <h1 className={'text-center text-6xl font-bold text-white'}>START EARNING
                            <span className={'block sm:inline bg-gradient-to-r from-orange-400 to-orange-700 px-2 ml-2 rounded-md'}>
                                PASSIVE INCOME
                            </span>
                        </h1>
                        <h2 className={'text-center font-light uppercase text-4xl text-white mt-5 px-5'}>
                            Invest in carefully selected and pre-vetted investment opportunities.
                        </h2>
                    </div>
                </div>

                <div className={'flex justify-center'}>
                    <Link to={'/register'}
                          className={'text-lg font-bold px-10 py-4 mt-5 bg-amber-400 hover:bg-amber-500 hover:shadow-lg rounded-full'}>
                        START INVESTING</Link>
                </div>
            </div>
        </section>
    )
}
export default HomeHeader;