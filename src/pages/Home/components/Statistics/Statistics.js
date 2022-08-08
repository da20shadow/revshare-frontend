function Statistics () {
    const statBoxStyle = 'px-10 py-5 mx-6 text-center'
    return (
        <div className={'w-3/4 pt-5 flex flex-wrap justify-center mx-auto'}>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>2 456</h3>
                <span className={'text-md font-bold uppercase text-gray-400'}>Investors</span>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>$5,480.17</h3>
                <span className={'text-md font-bold uppercase text-gray-400'}>Profit Paid</span>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>13%</h3>
                <span className={'text-md font-bold uppercase text-gray-400'}>Return</span>
            </div>

            <div className={statBoxStyle}>
                <h3 className={'mb-2 font-bold text-2xl text-gray-700'}>01/11/2020</h3>
                <span className={'text-md font-bold uppercase text-gray-400'}>Launch Date</span>
            </div>

        </div>
    )
}
export default Statistics;