import {Head } from '@inertiajs/react';
import HeroSection from './Home/HeroSection';
import Services from './Home/Services';
import TopDestination from './Home/TopDestination';
import BookingSteps from './Home/BookingSteps';
import NewsLetter from './Home/NewsLetter';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
           <Head title="Inicio" />
            <HeroSection/>
            <TopDestination />
            <Services />
            <BookingSteps />
            <NewsLetter />
        </>
    );
}
