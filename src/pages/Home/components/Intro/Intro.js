import lines from '../../../../assets/img/title-line.png';
function Intro (){
    return(
        <div className="mx-auto my-10">
            <h2 className={'text-center text-sky-900 text-5xl font-light'}>
                Invest and Trade or Just Receive Dividends.
            </h2>
            <img className={'mx-auto mt-5'} src={lines} alt=""/>
            <div className={'mx-auto text-center text-xl pt-10 w-full sm:w-3/4'}>
                <p>We're delighted to present an exceptional crowd funding service
                    of remarkable quality with a simple interface.
                </p>
                <p>Invest in carefully selected and researched investment opportunities.</p>
                <p>The high return we share is due to the quality high-yield real businesses we develop and
                    sell,</p>
                <p>crypto trading and other similar sources of passive income bring profits
                    that can in no way be compared to the big profits that a business can bring.
                </p>
                <p>
                    Invest now and receive dividends every time we make a deal or receive income.
                </p>
                <p>You can start right now with just <strong>$10</strong>.</p>
            </div>
        </div>
    )
}
export default Intro;