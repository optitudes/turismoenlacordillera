import { Link, Head } from '@inertiajs/react';
import HeroSection from './Home/HeroSection';
import Services from './Home/Services';
import TopDestination from './Home/TopDestination';
import BookingSteps from './Home/BookingSteps';
import Testimonials from './Home/Testimonials';
import NewsLetter from './Home/NewsLetter';
import '../../css/PrincipalPage.css'

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <HeroSection/>
            <Services />
            <TopDestination />
            <BookingSteps />
            <Testimonials/>
            <NewsLetter />
        </>
    );
}
