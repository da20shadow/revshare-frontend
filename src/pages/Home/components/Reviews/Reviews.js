import lines from "../../../../assets/img/title-line.png";
import Carousel from "../../../../components/Carousel/Carousel";

function Reviews () {
    return (
        <>
        <div className={'text-center text-lg pt-20'}>
            <h2 className={'text-center text-sky-900 text-5xl font-light'}>Reviews in Blogs and Monitors</h2>
            <img className={'mx-auto my-5'} src={lines} alt=""/>
            <p>Are you a blogger? </p>
            <p>Make a review for us and we will add it here!</p>
            <p>You can also receive a cash prize depending on the quality of the review and your blog traffic.</p>
            <p>Contact us for more information.</p>
        </div>
            <div className={'flex justify-center'}>
                <Carousel />
            </div>
        </>

    )
}
export default Reviews;