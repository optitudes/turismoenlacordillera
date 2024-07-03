import { useEffect, useState } from 'react';
import Background from "@/Assets/Backgrounds/greenBorder.png";
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Checkbox from '@/Components/Checkbox';
import MyMap from '@/Components/Map/Maps'
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import httpClient from "@/Utils/httpClient";


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        ventureInfo: {
            name: "",
            address: "",
            description: "",
            mapLatitude: "",
            mapLongitude: "",
        },
        micrositeInfo:{
            name: "",
            description: ""
        },
        userInfo: {
            email: "",
            password: "",
            password_confirmation: '',

        },
        profileInfo: {
            names: "",
            lastNames: "",
            idNumber: "",
            phoneNumber: "",
            phonePrefix: "+57",
            pictureUrl: "",
        }
    });
    const [isEntrepreneur, setIsEntrepreneur] = useState(false);
    const [ventureMapPosition,setVentureMapPosition] = useState(null);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if(ventureMapPosition != null){
            data.ventureInfo.mapLongitude = ventureMapPosition.lng;
            data.ventureInfo.mapLatitude = ventureMapPosition.lat;
        }
        if(!isEntrepreneur){
            data.ventureInfo =null;
            data.micrositeInfo = null;
        }
        try {
            const response = await httpClient.post("auth/register",data);
            if (response.data.success) {
                console.log(response.data);
                alert(response.data.message);
            } else {
                console.log(response.data);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
        //post(route('register'));
        console.log(data);
    };
    const updatePositions = (positions) => {
        setVentureMapPosition(positions);
    }

    const handleCheckboxIsEntrepreneurChange = (event) => {
        const checked = event.target.checked;
        setIsEntrepreneur(checked);
        console.log(checked ? 'Eres emprendedora?' : 'No eres emprendedora.');
    };
    return (

        <>
            <Head title="Registro" />
            <div className='bg-slate-200  rounded-lg shadow-lg w-full max-w-md '>

                <form onSubmit={submit} className='m-14'>
                    <div className='mt-4'>
                        <InputLabel htmlFor="name" value="Nombre" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('profileInfo', { ...data.profileInfo, names: e.target.value })}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="lastNames" value="Apellidos del usuario" />

                        <TextInput
                            id="lastNames"
                            type="text"
                            name="lastNames"
                            value={data.profileInfo.lastNames}
                            className="mt-1 block w-full"
                            autoComplete="lastNames"
                            onChange={(e) => setData('profileInfo', { ...data.profileInfo, lastNames: e.target.value })}
                            required
                        />

                        <InputError message={errors.lastNames} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="phoneNumber" value="Número de teléfono" />

                        <TextInput
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={data.profileInfo.phoneNumber}
                            className="mt-1 block w-full"
                            autoComplete="phoneNumber"
                            onChange={(e) => setData('profileInfo', { ...data.profileInfo, phoneNumber: e.target.value })}
                        />

                        <InputError message={errors.lastNames} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('userInfo', { ...data.userInfo, email: e.target.value })}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('userInfo', { ...data.userInfo, password: e.target.value })}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirma la contraseña" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('userInfo', { ...data.userInfo, password_confirmation: e.target.value })}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="idNumber" value="Cédula del usuario" />

                        <TextInput
                            id="idNumber"
                            type="text"
                            name="idNumber"
                            value={data.profileInfo.idNumber}
                            className="mt-1 block w-full"
                            autoComplete="idNumber"
                            onChange={(e) => setData('profileInfo', { ...data.profileInfo, idNumber: e.target.value })}
                            required
                        />

                        <InputError message={errors.idNumber} className="mt-2" />
                    </div>
                    

                    <div className="p-4">
                        <label className="inline-flex items-center">
                            <Checkbox
                                checked={isEntrepreneur}
                                onChange={handleCheckboxIsEntrepreneurChange}
                                className="form-checkbox text-indigo-600 h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Eres emprendedora?</span>
                        </label>
                    </div>
                    {isEntrepreneur?
                    <div>
                        <div>
                            <InputLabel htmlFor="micrositeName" value="Nombre del micrositio" />

                            <TextInput
                                id="micrositeName"
                                name="micrositeName"
                                value={data.micrositeInfo.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('micrositeInfo', { ...data.micrositeInfo, name: e.target.value })}
                                required
                            />

                            <InputError message={errors.micrositeName} className="mt-2" />
                        </div>
                      
                        <div>
                            <InputLabel htmlFor="ventureName" value="Nombre de la empresa" />

                            <TextInput
                                id="ventureName"
                                name="ventureName"
                                value={data.ventureInfo.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('ventureInfo', { ...data.ventureInfo, name: e.target.value })}
                                required
                            />

                            <InputError message={errors.ventureName} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="ventureAddress" value="Dirección de la empresa" />

                            <TextInput
                                id="ventureAddress"
                                name="ventureAddress"
                                value={data.ventureInfo.address}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('ventureInfo', { ...data.ventureInfo, address: e.target.value })}
                                required
                            />

                            <InputError message={errors.ventureAddress} className="mt-2" />
                        </div>
                        
                        <div className='mt-1 block w-full py-2'>
                            <InputLabel value="Ubicación de la empresa (opcional) " />
                            <MyMap
                                style={{ 
                                    height: '250px'
                                }}
                                updatePositions={updatePositions}
                             />
                        </div>

                    </div>:<></>
                    }

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Ya estás registrad@?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                           Registrarse 
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
