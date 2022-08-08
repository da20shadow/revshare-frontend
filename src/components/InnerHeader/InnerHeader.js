
function InnerHeader({title}){
    return(
        <header className={'bg-gradient-to-r from-cyan-500 to-blue-600 shadow'}>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl text-center text-white">{title}</h1>
            </div>
        </header>
    )
}
export default InnerHeader;