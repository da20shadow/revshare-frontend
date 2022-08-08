import crypto from "../../../../assets/img/crypto.jpg";
import arb from "../../../../assets/img/arbitration.jpg";
import aff from "../../../../assets/img/aff.jpg";
import risk from "../../../../assets/img/highRisk.jpg";

function Income(){
    const incomeBoxStyle = 'w-full md:w-40 h-40 bg-white border shadow-lg rounded-md px-10 py-5 mx-2 text-center';
    return (
        <div className={'w-full w-3/4 flex flex-wrap justify-center mx-auto mt-10 z-10'}>

            <div className={incomeBoxStyle}>
                <img className={'mx-auto'} src={crypto} alt="Crypto Trading"/>
                <span>Crypto Trading</span>
            </div>

            <div className={incomeBoxStyle}>
                <img className={'mx-auto'} src={arb} alt="HRI"/>
                <span>High Risk Investments</span>
            </div>

            <div className={incomeBoxStyle}>
                <img className={'mx-auto'} src={aff} alt="Aff Marketing"/>
                <span>Affiliate Marketing</span>
            </div>

            <div className={incomeBoxStyle}>
                <img className={'mx-auto'} src={risk} alt="Arbitration"/>
                <span>Arbitration</span>
            </div>

            <div className={incomeBoxStyle}>
                <img className={'mx-auto'} src="" alt="Other"/>
                <span>Other</span>
            </div>

        </div>
    )
}
export default Income;