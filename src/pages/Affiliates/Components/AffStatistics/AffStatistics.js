function AffStatistics () {
    const statBoxStyle = 'px-10 py-5 shadow-xl rounded-md bg-gray-50 border border-gray-300';

    return (
        <div className={'grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'}>

            <div className={statBoxStyle}>
                <h3 className={'text-center text-gray-700 text-2xl font-bold'}>$3335.26</h3>
                <p className={'text-center text-gray-600'}>Ref. Deposits</p>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'text-center text-gray-700 text-2xl font-bold'}>$333.52</h3>
                <p className={'text-center text-gray-600'}>Total Commission</p>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'text-center text-gray-700 text-2xl font-bold'}>154</h3>
                <p className={'text-center text-gray-600'}>Total Referrals</p>
            </div>

        </div>
    )
}
export default AffStatistics;