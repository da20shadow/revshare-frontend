function SharesList({shares,setShares,setOrder,showModal,setShowModal,user}) {

    const showOrder = (orderId) => {
        if (!shares) {
            return;
        }
        const order = shares.find(o => o.id === orderId);
        console.log(order)
        setOrder(order);
        setShowModal(!showModal);

    }

    const sortBy = (e) => {
        const type = e.currentTarget.value;
        setShares(oldShares => {
            switch (type) {
                case 'priceLow':
                    return [...oldShares].sort((a,b)=> a.price > b.price);
                case 'priceHigh':
                    return [...oldShares].sort((a,b)=> a.price < b.price);
                case 'quantityLow':
                    return [...oldShares].sort((a,b)=> a.quantity > b.quantity);
                case 'quantityHigh':
                    return [...oldShares].sort((a,b)=> a.quantity < b.quantity);
            }
        });
    }

    const btnStyle = 'mx-3 py-1 px-5 font-bold text-sm text-gray-100 border border-gray-400 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md';

    return (
        <>
            {/*Sort By Option*/}
            <div className={'flex justify-end'}>
                <select name="sort"
                        onChange={sortBy}
                        className={'px-5 py-2 rounded-md'}>
                    <option value="">Sort By</option>
                    <option value="priceLow">Price (Low)</option>
                    <option value="priceHigh">Price (High)</option>
                    <option value="quantityLow">Quantity (Low)</option>
                    <option value="quantityHigh">Quantity (High)</option>
                </select>
            </div>

            {/*Shares List*/}
            <div className="h-fit" style={{'overflowX': "auto"}}>

                <table className={'marketplace-table'}>

                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Net Amount</th>
                        <th>Commission</th>
                        <th> </th>
                    </tr>
                    </thead>

                    { shares ?
                        <tbody>
                        {shares.map(s => {
                            if (s.userId !== user.id){
                                return (
                                    <tr key={s.id} className={'table-row'}>
                                        <td>{s.id}</td>
                                        <td>{s.quantity}</td>
                                        <td>${(s.price).toFixed(4)}</td>
                                        <td>${(s.quantity * s.price).toFixed(4)}</td>
                                        <td>${((s.quantity * s.price) * 0.10).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => showOrder(s.id)} className={btnStyle}>Buy
                                            </button>
                                        </td>
                                    </tr>)
                            }
                        })
                        }
                        </tbody>
                        : <h2>No Shares Available</h2>
                    }
                </table>

            </div>

        </>
    )
}
export default SharesList;