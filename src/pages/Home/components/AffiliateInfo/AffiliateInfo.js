import lines from "../../../../assets/img/title-line.png";
import affImg from "../../../../assets/img/aff-icon.png";

function AffiliateInfo() {
    return (
            <div className={'w-full md:w-3/4 text-white text-center text-xl pt-8 mx-auto'}>
                <h2 className={'text-center text-5xl font-light'}>Affiliate Information (Affiliates
                    Program)</h2>
                <img className={'mx-auto my-5'} src={lines} alt=""/>
                <p>Affiliate program that pays special bonuses!</p>
                <p> Invite new users and get additional income from their purchases.</p>
                <p>You will receive 10% for each purchase your referral makes.</p>
                <p>Advanced promoters earn higher bonuses.</p>
                <p>This is the ultimate promotional challenge that allows you to unlock additional rewards.</p>

                <div className={'flex flex-wrap justify-center text-center mt-5'}>

                    <div className={'mx-2 p-1 shadow-lg rounded-md bg-gradient-to-r from-cyan-500 to-blue-500'}>
                        <div className={'border border-white m-2 p-10 rounded-md'}>
                            <img className={'mx-auto mb-2'} src={affImg} alt=""/>
                            <h3>First Bonus: <strong>$100</strong></h3>
                        </div>
                    </div>

                    <div className={'mx-2 p-1 shadow-lg rounded-md bg-gradient-to-r from-amber-500 to-orange-500'}>
                        <div className={'border border-white m-2 p-10 rounded-md'}>
                            <img className={'mx-auto mb-2'} src={affImg} alt=""/>
                            <h3>First Bonus: <strong>$200</strong></h3>
                        </div>
                    </div>

                    <div className={'mx-2 p-1 shadow-lg rounded-md bg-gradient-to-r from-green-400 to-green-500'}>
                        <div className={'border border-white m-2 p-10 rounded-md'}>
                            <img className={'mx-auto mb-2'} src={affImg} alt=""/>
                            <h3>First Bonus: <strong>$300</strong></h3>
                        </div>
                    </div>

                </div>

            </div>
    )
}

export default AffiliateInfo;