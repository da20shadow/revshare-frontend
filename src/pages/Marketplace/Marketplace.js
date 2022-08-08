import {InnerHeader} from "../../components";
import './Marketplace.css';

function Marketplace() {
    const btnStyle = 'mx-3 py-1 px-5 font-bold text-sm text-gray-100 border border-gray-400 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md';

    return (

        <>
            <InnerHeader title={'Marketplace'}/>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">

                        <h2 className={'mb-10 text-center text-2xl text-gray-700'}>Available Shares in Marketplace: <strong>254</strong></h2>

                        <div className="h-fit" style={{'overflow-x': "auto"}}>

                            <table className={'marketplace-table'}>

                                <thead>
                                    <th>User</th>
                                    <th>Share</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Net Amount</th>
                                    <th>Commission</th>
                                    <th> </th>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>username1</td>
                                        <td>Ad Share</td>
                                        <td>100</td>
                                        <td>$1.2315</td>
                                        <td>$123.15</td>
                                        <td>$12.315</td>
                                        <td>
                                            <button className={btnStyle} >Buy</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>username2</td>
                                        <td>Ad Share</td>
                                        <td>200</td>
                                        <td>$1.2315</td>
                                        <td>$246.30</td>
                                        <td>$24.630</td>
                                        <td>
                                            <button className={btnStyle} >Buy</button>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Marketplace;