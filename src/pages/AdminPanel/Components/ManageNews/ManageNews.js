import {InnerHeader} from "../../../../components";
import AdminMenu from "../AdminMenu";
import {BsCheckLg} from "react-icons/bs";
import {GiSandsOfTime} from "react-icons/gi";
import {MdArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import {useEffect, useState} from "react";
import {getNews} from "../../../../services/newsService";

function ManageNews(){
    const [news,setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numOfPages, setNumOfPages] = useState(1);
    const [totalNumNews, setTotalNumNews] = useState(0);

    //TODO: useEffect to get the news from DB!
    useEffect(()=>{
        getNews().then(res => {
            console.log(res.news)
            setNews(res.news)
        }).catch(err => {
            console.log(err.message)
        })
    },[])

    const nextPage = (e) => {
        e.preventDefault();
        //TODO: on mobile not work next
        let newPage = currentPage + 1;
        if (newPage >= numOfPages) {

        } else {
            const newOffset = 10 * newPage;
            setCurrentPage(newPage);

        }
    }
    const prevPage = (e) => {
        e.preventDefault();
        //TODO: on mobile not work prev
        let newPage = currentPage - 1;
        if (newPage < 0) {
            newPage = 0;
        }

        let newOffset = 10 * newPage;
        setCurrentPage(newPage);

    }
    return(
        <>
            <InnerHeader title={'Manage News'} />
            <AdminMenu />
            <div style={{'overflowX': "auto"}} className={'mx-8 my-8'}>
                <table className={'w-full'}>

                    <thead className={'bg-sky-700 text-white'}>
                    <tr>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Date</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Title</th>
                        <th className={'py-3 px-5 text-lg border-r border-gray-100'}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        news ? news.map(n => (
                            <tr key={n.id} className={'hover:bg-gray-100 text-center'}>
                                <td className={'border-b border-gray-200 py-3 px-5'}>{n.date}</td>
                                <td className={'border-b border-gray-200 py-3 px-5'}>{(n.title)}</td>
                                <td className={'border-b border-gray-200 py-3 px-5 flex justify-center'}>
                                    <button className={'py-1 px-4 mx-1 hover:shadow-lg bg-white text-sm border rounded'}>Edit</button>
                                    <button className={'py-1 px-4 mx-1 hover:shadow-lg bg-rose-50 text-sm border rounded'}>Delete</button>
                                </td>
                            </tr>
                        ))
                            : ''
                    }

                    </tbody>

                </table>
            </div>

            {/*Pagination*/}
            <div className="mt-5 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">


                <div className="flex-1 flex justify-around sm:hidden">
                    <a href="#"
                       className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                    <a href="#"
                       className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
                </div>

                <div
                    className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">

                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <a href="#" onClick={prevPage}
                               className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Previous</span>
                                <MdArrowBackIos/>
                            </a>

                            <span
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> <strong>{currentPage + 1}</strong> </span>

                            <a href="#" onClick={nextPage}
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
                            <span
                                className="font-medium"> {totalNumNews ? totalNumNews : 'Loading...'} </span>
                            results
                        </p>
                    </div>

                </div>

            </div>

        </>
    )
}
export default ManageNews;