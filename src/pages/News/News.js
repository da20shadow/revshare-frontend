import {InnerHeader} from "../../components";

function News() {
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

                            <div className={newsBox}>

                                <h2 className={newsTitleStyle}>
                                    <a href="#">New script with new features! </a>
                                    | <span>23/05/2022</span>
                                </h2>

                                <p className={descriptionStyle}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Accusamus aliquam aliquid assumenda dignissimos eligendi
                                    enim exercitationem facere inventore necessitatibus neque,
                                    odit perspiciatis quasi recusandae repellendus similique sint
                                    tempora ullam voluptatem.
                                </p>
                                <button className={'text-gray-600 hover:text-sky-700 font-bold'}>Read More...</button>
                            </div>
                            <div className={newsBox}>

                                <h2 className={newsTitleStyle}>
                                    <a href="#">New script with new features! </a>
                                    | <span>23/05/2022</span>
                                </h2>

                                <p className={descriptionStyle}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Accusamus aliquam aliquid assumenda dignissimos eligendi
                                    enim exercitationem facere inventore necessitatibus neque,
                                    odit perspiciatis quasi recusandae repellendus similique sint
                                    tempora ullam voluptatem.
                                </p>
                                <button className={'text-gray-600 hover:text-sky-700 font-bold'}>Read More...</button>
                            </div>
                            <div className={newsBox}>

                                <h2 className={newsTitleStyle}>
                                    <a href="#">New script with new features! </a>
                                    | <span>23/05/2022</span>
                                </h2>

                                <p className={descriptionStyle}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Accusamus aliquam aliquid assumenda dignissimos eligendi
                                    enim exercitationem facere inventore necessitatibus neque,
                                    odit perspiciatis quasi recusandae repellendus similique sint
                                    tempora ullam voluptatem.
                                </p>
                                <button className={'text-gray-600 hover:text-sky-700 font-bold'}>Read More...</button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default News;