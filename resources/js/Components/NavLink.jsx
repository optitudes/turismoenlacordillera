import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? `border-salmon text-[#f9536b] focus:border-salmon  `
                    : `border-transparent text-white hover:text-salmon hover:border-gray-300 focus:text-text-orange-500 focus:border-gray-300 `) +
                className
            }
        >
            {children}
        </Link>
    );
}