import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Background from "@/Assets/Backgrounds/greenBorder.png";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout
         style={{
             backgroundImage: `url(${Background})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
             }}
        >
            <Head title="Log in" />
            
            Hopla
        </GuestLayout>
    );
}
