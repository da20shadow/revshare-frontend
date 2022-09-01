function AdBanner({ bannerSize, code }){
    //TODO: implement banner sizes

    switch (bannerSize){
        case '728':
            //TODO show 1 banner 728x90
            break;
        case '468':
            //TODO: show 2 banners 468x60
            break;
    }

    return (
        <div className={'flex justify-center border'}>
            <div className={'my-2 py-2 px-4 border bg-green-100'}>
                {code
                    ? code
                    : 'Banner Code Goes Here'}
            </div>
        </div>
    )
}
export default AdBanner;