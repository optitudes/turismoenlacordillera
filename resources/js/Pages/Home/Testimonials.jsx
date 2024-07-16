import { useCallback, useRef,useState } from "react";
import Text from "../../Components/Text"
import { TestimonialTexts } from "../../Constants/dataLists"
import { ArrowCircleRight } from "@phosphor-icons/react";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Colors from '../../Constants/Colors';
import Card from "../../Components/Card"
import ProfileImg1 from "../../Assets/profile1.jpeg"
import ProfileImg2 from "../../Assets/profile2.jpeg"
import ProfileImg3 from "../../Assets/profile3.jpeg"
import ProfileImg4 from "../../Assets/profile4.jpeg"

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,

    };

    const renderProfileImg = useCallback((element) => {
        switch (element) {
            case 0:
                return ProfileImg2;
            case 1:
                return ProfileImg1;
            case 2:
                return ProfileImg3;
            case 3:
                return ProfileImg4;
            default:
                return "";
        }
    }, [])

    return (
        <section className="w-full h-auto flex flex-col items-start justify-center relative lg:px-24 md:px-10 px-6 mt-36 gap-5">
            <main className='w-full grid md:grid-cols-2 lg:gap-0 gap-8 md:gap-5'>
                {/* Text and Steps Container  */}
                <div className='w-full flex flex-col gap-6'>
                    <Text as="p" className="font-light text-base text-color3/80 tracking-widest">
                        {TestimonialTexts.firstText}
                    </Text>
                    <Text as="h1" className="lg:text-5xl md:text-3xl text-4xl text-color3 font-medium">
                        {TestimonialTexts.secondText}
                    </Text>
                </div>

                {/* Testimonial Slides Container  */}
                <div className="w-full  flex justify-center gap-4 items-center">



                <div className="max-w-full">
                    <Carousel
                            showStatus={false}
                            showIndicators={true}
                            infiniteLoop={true}
                            centerMode
                            centerSlidePercentage={100} // Adjust the percentage based on your needs
                            selectedItem={currentIndex}
                            onChange={(index) => setCurrentIndex(index)}

                            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                hasPrev && (
                                <button
                                    type="button"
                                    onClick={onClickHandler}
                                    title={label}
                                    style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    cursor: 'pointer',
                                    zIndex: 2,
                                    // Agrega más estilos según tus necesidades
                                    }}
                                >
                                    <ArrowCircleLeft size={25} color={Colors.primarydark2} weight="fill" />

                                </button>
                                )
                            }
                            renderArrowNext={(onClickHandler, hasNext, label) =>
                                hasNext && (
                                <button
                                    type="button"
                                    onClick={onClickHandler}
                                    title={label}
                                    style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 0,
                                    cursor: 'pointer',
                                    zIndex: 2,
                                    // Agrega más estilos según tus necesidades
                                    }}
                                >
                                <ArrowCircleRight size={25} color={Colors.primarydark2} weight="fill" />

                                </button>
                                )
                            }
                            
                    >    
                    {TestimonialTexts.feedBacks.map((feedBack, index) => (
                                    <div className="w-full" key={index}>
                                        <Card key={index} cardClass="bg-white shadow border-[1px] border-color3/10 relative rounded-xl p-4 lg:h-[200px] h-[260px] lg:mb-4 w-full flex gap-4 justify-start" imageAlt={feedBack.person} imageSrc={renderProfileImg(index)} imageWrapperClass="w-20 h-20 rounded-full absolute lg:bottom-4 bottom-3 right-4 overflow-hidden" cover="object-cover object-top" textWrapperClass="flex flex-col justify-center gap-6">
                                        {index}
                                            <Text as="q" className="text-[0.84rem] font-light text-color3">
                                                {feedBack.text}
                                            </Text>
                                            <div className="flex flex-col gap-2">
                                                <Text as="h4" className="text-base text-color3 font-medium">
                                                    {feedBack.person}
                                                </Text>
                                                <Text as="p" className="text-sm text-color3 font-light">
                                                    {feedBack.location}
                                                </Text>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                    </Carousel>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Testimonials