import './Home.css';
import {HomeHeader, Income, Intro, Statistics,AffiliateInfo} from "./components";
import Reviews from "./components/Reviews";

function Home() {
    return (
        <>
            <HomeHeader />

            <div className={'welcome'}>
                <Statistics />
                <Intro />
                <Income />
            </div>

            <div className={'reviews pb-20'}>
                <Reviews />
            </div>

            <div className={'affiliate'}>
                <AffiliateInfo />
            </div>
        </>
    )
}

export default Home;