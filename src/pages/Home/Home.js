import './Home.css';
import crypto from '../../assets/img/crypto.jpg';
import arb from '../../assets/img/arbitration.jpg';
import aff from '../../assets/img/aff.jpg';
import risk from '../../assets/img/highRisk.jpg';
import {Link} from "react-router-dom";
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

            {/*<div className="welcome-part">*/}
            {/*    <div className="container">*/}

            {/*        <h1 className="main-title">Welcome To&nbsp;*/}
            {/*            <span>LucrativeShares</span></h1>*/}

            {/*        <div className="row">*/}
            {/*            <div className="intro">*/}
            {/*                <p className="wel-para">We are a young ambitious team, ready to*/}
            {/*                    conquer big peaks. A team whose limit is the sky! We're delighted to present an*/}
            {/*                    exceptional*/}
            {/*                    crowd funding service of remarkable quality with a simple interface. Invest in carefully*/}
            {/*                    selected and researched business opportunities.</p>*/}
            {/*                <p className="wel-para">The high return we share is due to the*/}
            {/*                    quality high-yield real businesses we develop and sell. Crypto trading and other similar*/}
            {/*                    sources of passive income bring profits that can in no way be compared to the big*/}
            {/*                    profits*/}
            {/*                    that a business can bring. </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={'buy-part'}>




            </div>

            {/*<div className={'reviews-part'}>*/}

            {/*    <div className="info-text">*/}
            {/*        <h2>Reviews in Blogs and Monitors.</h2>*/}
            {/*        <p>Are you a blogger? Make a review for us and we will add it here!*/}
            {/*            You can also receive a cash prize depending on the quality of the review and your blog traffic.*/}
            {/*            Contact us for more information.</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Home;