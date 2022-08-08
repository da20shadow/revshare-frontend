import {InnerHeader} from "../../components";

function Faq() {
    const faqTitleStyle = 'text-2xl pb-2 text-gray-700';
    const faqDescStyle = 'text-lg text-gray-500';
    const faqBox = 'px-10 py-2 my-4';
    return (
        <>

            <InnerHeader title={'FAQ'}/>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-fit">

                            <div className={faqBox}>
                                <h2 className={faqTitleStyle}>What is LS...?</h2>
                                <p className={faqDescStyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ab, eum sapiente.
                                    Adipisci alias consectetur et expedita hic inventore nulla recusandae!
                                    Culpa doloribus ipsa nisi quia, quis suscipit temporibus ullam voluptate.
                                </p>
                            </div>

                            <div className={faqBox}>
                                <h2 className={faqTitleStyle}>How it works...?</h2>
                                <p className={faqDescStyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ab, eum sapiente.
                                    Adipisci alias consectetur et expedita hic inventore nulla recusandae!
                                    Culpa doloribus ipsa nisi quia, quis suscipit temporibus ullam voluptate.
                                </p>
                            </div>

                            <div className={faqBox}>
                                <h2 className={faqTitleStyle}>How to...?</h2>
                                <p className={faqDescStyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ab, eum sapiente.
                                    Adipisci alias consectetur et expedita hic inventore nulla recusandae!
                                    Culpa doloribus ipsa nisi quia, quis suscipit temporibus ullam voluptate.
                                </p>
                            </div>

                            <div className={faqBox}>
                                <h2 className={faqTitleStyle}>How...?</h2>
                                <p className={faqDescStyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ab, eum sapiente.
                                    Adipisci alias consectetur et expedita hic inventore nulla recusandae!
                                    Culpa doloribus ipsa nisi quia, quis suscipit temporibus ullam voluptate.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Faq;