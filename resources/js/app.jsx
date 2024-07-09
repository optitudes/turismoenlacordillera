import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import GuestLayout from '@/Layouts/GuestLayout';
import PanelLayout from '@/Layouts/PanelLayout';
import { EnvelopeSimple } from '@phosphor-icons/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')) .then((page) => {
                if(name.startsWith('Panel')){
                    page.default.layout =  ((page) => <PanelLayout>{page}</PanelLayout>);
                }{
                    page.default.layout = page.default.layout || ((page) => <GuestLayout>{page}</GuestLayout>);
                }
                return page;
            }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
