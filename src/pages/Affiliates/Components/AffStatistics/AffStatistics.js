function AffStatistics ({totalPurchases,commission,totalReferrals}) {
    const statBoxStyle = 'px-10 py-5 shadow-xl rounded-md bg-gray-50 border border-gray-300';

    console.log(commission)

    return (
        <div className={'grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'}>

            <div className={statBoxStyle}>
                <h3 className={'text-center text-gray-700 text-2xl font-bold'}>
                    ${totalPurchases.toFixed(2)}
                </h3>
                <p className={'text-center text-gray-600'}>Ref. Purchases</p>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'text-center text-gray-700 text-2xl font-bold'}>
                    ${commission.toFixed(2)}
                </h3>
                <p className={'text-center text-gray-600'}>Total Commission</p>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'text-center text-gray-700 text-2xl font-bold'}>
                    {totalReferrals}
                </h3>
                <p className={'text-center text-gray-600'}>Total Referrals</p>
            </div>

        </div>
    )
}
export default AffStatistics;