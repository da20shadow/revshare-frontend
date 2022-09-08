import {InnerHeader} from "../../components";
import {useEffect, useState} from "react";
import {getNews} from "../../services/newsService";

function News() {
    const [news,setNews] = useState([]);

    useEffect(()=>{
        getNews().then(res => {
            setNews(res.news)
            console.log(res.news)
        }).catch(err => {

        })
    },[])


    const newsBox = 'px-10 py-5 my-4 bg-gray-50 hover:bg-gray-100 hover:shadow-lg';
    const newsTitleStyle = 'w-fit text-xl text-gray-700 pb-2 font-bold hover:text-sky-700';
    const descriptionStyle = 'text-gray-600';

    return (
        <>

            <InnerHeader title={'News'}/>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            {
                                news ? news.map(n =>
                                        <div key={n.id} className={newsBox}>

                                            <h2 className={newsTitleStyle}>
                                                <a href="#">{n.title} </a>
                                                | <span>{(n.date).substr(0,10)}</span>
                                            </h2>

                                            <p className={descriptionStyle}>
                                                {(n.description).substr(0,255)}...
                                            </p>
                                            <button className={'text-gray-600 hover:text-sky-700 font-bold'}>Read More...</button>
                                        </div>
                                )
                                    : 'No News!'
                            }

                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default News;