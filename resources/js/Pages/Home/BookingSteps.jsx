import { useCallback } from 'react'
import List from '../../Components/List'
import Text from "../../Components/Text"
import { BookingStepsTexts } from "../../Constants/dataLists"
import { AirplaneInFlight, AirplaneTilt, Buildings, MapTrifold, Receipt, Wallet } from '@phosphor-icons/react'
import Card from "../../Components/Card"
import CardImage1 from "../../Assets/bookingImage1.jpeg"
import CardImage2 from "../../Assets/bookingImage2.jpeg"

const BookingSteps = () => {

    const renderIcons = useCallback((element) => {
        switch (element) {
            case 0:
                return <MapTrifold size={30} className='text-springgreen' weight="fill" />;
            case 1:
                return <Wallet size={30} className='text-springgreen' weight="fill" />;
            case 2:
                return <AirplaneInFlight size={30} className='text-springgreen' weight="fill" />;
            default:
                return "";
        }
    }, [])

    return (
        <section className="w-full h-auto flex flex-col items-start justify-center relative lg:px-24 md:px-10 px-6 my-28 gap-5">
            <Text as="p" className="font-light text-base text-white tracking-widest">
                {BookingStepsTexts.firstText}
            </Text>
            <main className='w-full grid md:grid-cols-2 lg:gap-6 gap-12 md:gap-5'>
                {/* Text and Steps Container  */}
                <div className='w-full flex flex-col gap-6 order-2 md:order-1'>
                    <Text as="h1" className="lg:text-5xl md:text-3xl text-4xl text-white font-medium">
                        {BookingStepsTexts.secondText}
                    </Text>
                    <ul className='flex flex-col gap-8 lg:mt-5 mt-3'>
                        {
                            BookingStepsTexts.listOfSteps.map((step, index) => (
                                <List className='flex gap-5 items-center justify-start' key={index}>
                                    <Text as='p' className={`text-white ${index === 0 ? "bg-color2" : index === 1 ? "bg-color1" : "bg-color3"} p-2 rounded-md`}>
                                        {renderIcons(index)}
                                    </Text>
                                    <Text as='p' className='text-sm text-white font-light'>
                                        {step.text}
                                    </Text>
                                </List>

                            ))
                        }
                    </ul>
                </div>
                {/* Card Container  */}
                <div className='w-full flex flex-col justify-center lg:items-center items-start relative order-1 md:order-2'>
                    {/* First Card  */}
                    <Card cardClass='border border-springgreen lg:w-[70%] md:w-[80%] w-[90%] shadow-2xl shadow-sky-500/70 p-4 rounded-xl flex flex-col gap-4' imageAlt={BookingStepsTexts.cardOne.name} imageSrc={CardImage1} imageWrapperClass='h-[150px] overflow-hidden rounded-xl shadow' cover='object-cover object-top' textWrapperClass='flex flex-col gap-3'>
                        <Text as='h4' className='text-base font-medium text-white'>
                            {BookingStepsTexts.cardOne.name} 
                        </Text>
                        <Text as='p' className='text-sm font-light text-white'>
                            {BookingStepsTexts.cardOne.date}
                        </Text>
                        <div className='flex items-center gap-6'>
                            <Text as='span' className='text-white font-light bg-color3/5 p-2.5 rounded-full'>
                                <Receipt size={18} color="currentColor" weight="light" />
                            </Text>
                            <Text as='span' className='text-white font-light bg-color3/5 p-2.5 rounded-full'>
                                <MapTrifold size={18} color="currentColor" weight="light" />
                            </Text>

                            <Text as='span' className='text-white font-light bg-color3/5 p-2.5 rounded-full'>
                                <AirplaneTilt size={18} color="currentColor" weight="light" />
                            </Text>
                        </div>
                        <Text as='p' className='text-sm font-light text-white flex items-center gap-3'>
                            <Buildings size={18} color="currentColor" weight="light" />
                            {BookingStepsTexts.cardOne.people}
                        </Text>
                    </Card>

                    {/* Second Absolute Card  */}
                    <Card cardClass='hidden  sm:block flex gap-3 justify-start items-start absolute lg:right-0 -right-4 bottom-10 bg-green500 py-3 px-4 border-2 border-white shadow-md rounded-xl' imageAlt={BookingStepsTexts.cardTwo.destination} imageSrc={CardImage2} cover='object-cover object-top' imageWrapperClass='h-16 w-16 rounded-full overflow-hidden' textWrapperClass='flex flex-col gap-2'>
                        <Text as='p' className='text-xs font-light text-white'>
                            {BookingStepsTexts.cardTwo.status}
                        </Text>
                        <Text as='h4' className='text-base font-medium text-white'>
                            {BookingStepsTexts.cardTwo.destination}
                        </Text>
                        <Text as='p' className='text-xs font-light text-white pb-2 relative before:w-[40%] before:h-1 before:absolute before:bottom-0 before:left-0 before:bg-white'>
                            {BookingStepsTexts.cardTwo.completion}
                        </Text>
                    </Card>
                </div>
            </main>
        </section>
    )
}

export default BookingSteps