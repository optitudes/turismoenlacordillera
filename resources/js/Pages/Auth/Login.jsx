import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import Background from "@/Assets/Backgrounds/greenBorder.png";
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import usePasswordToggle from '@/CustomHooks/usePasswordToggle';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [passwordInputType, toggleIcon] = usePasswordToggle();

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        //TODO: refactorizar ya que el window.location es necesario como dependencia de GuestLayout.jsx, 
         post(route('login'), {
            onSuccess: () => {
            window.location.href = route('dashboard');
            },
    });
    };

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
            <div className='bg-slate-200  rounded-lg shadow-lg w-full max-w-md '>

                <form onSubmit={submit} className='m-14' >

                    <div  >
                        <p className="text-zinc-950 text-opacity-100">Correo</p>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            clas
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 relative"><p className="text-zinc-950 text-opacity-100">Contraseña</p>

                        <TextInput
                            id="password"
                            type={passwordInputType}
                            name="password"
                            value={data.password}
                            className="mt-1 w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <span className='absolute inset-y-0 right-0 flex items-center pr-3 ps-3 mt-1 pt-6 cursor-pointer'>{toggleIcon}</span>

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="block mt-4" >
                        <label className="flex items-center" >
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-zinc-950">Remember me </span >
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-zinc-950 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
