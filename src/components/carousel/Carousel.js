
import {carouselHomePageData} from '../../config/config';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";

const elementsCarousel = carouselHomePageData.map(item => {
    return <img className='carousel_item' src={item.path} alt={item.alt}/>
})

// console.log(elementsCarousel);

const Carousel = () => {
    return (
        <div className="block_carousel">
            <AliceCarousel 
            mouseTracking 
            items={elementsCarousel}
            autoPlay={true}
            autoPlayInterval={1000}
            disableButtonsControls={true}
            disableDotsControls={true}
            infinite={true}
            controlsStrategy={'responsive'}
            responsive={{0: {items: 10}}}/>
        </div>
    )
}

export default Carousel;