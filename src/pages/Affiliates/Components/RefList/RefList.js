import {MdArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";

function RefList({referrals}){


    return (
        <div className={'mt-5'}>

            <h2 className={'my-5 text-center text-3xl text-gray-700'}>Referrals</h2>

            <div style={{'overflowX': "auto"}}>
                <table className={'w-full'}>

                    <thead className={'bg-sky-700 text-white'}>
                    <tr>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>#</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Username</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Commission</th>
                    </tr>
                    </thead>

                    {
                        referrals
                            ? <tbody>
                            {
                                referrals.map(r =>
                                    <tr key={r.id} className={'hover:bg-gray-100 text-center'}>
                                        <td className={'border border-gray-200 py-3 px-5'}>{r.id}</td>
                                        <td className={'border border-gray-200 py-3 px-5'}>{r.username}</td>
                                        <td className={'border border-gray-200 py-3 px-5'}>${(r.refCom).toFixed(2)}</td>
                                    </tr>
                                )
                            }

                            </tbody>
                            : ''
                    }

                </table>
            </div>

            {/*Pagination*/}
            <div
                className="mt-5 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">


                <div className="flex-1 flex justify-around sm:hidden">
                    <a href="#"
                       className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                    <a href="#"
                       className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
                </div>

                <div
                    className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">

                    <div>
                        <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination">
                            <a href="#"
                               className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Previous</span>
                                <MdArrowBackIos/>
                            </a>
                            <a href="#" aria-current="page"
                               className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
                            <a href="#"
                               className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                            <a href="#"
                               className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
                            <span
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
                            <a href="#"
                               className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
                            <a href="#"
                               className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
                            <a href="#"
                               className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>
                            <a href="#"
                               className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Next</span>
                                <MdOutlineArrowForwardIos/>
                            </a>
                        </nav>
                    </div>

                    <div>
                        <p className="text-sm text-gray-700">
                            Showing
                            <span className="font-medium"> 1 </span>
                            to
                            <span className="font-medium"> 10 </span>
                            of
                            <span className="font-medium"> 97 </span>
                            results
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default RefList;