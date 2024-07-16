import {useState,useEffect} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Select from '@/Components/Select'
import httpClient from "@/Utils/httpClient";
import { useUserInfo } from '@/Pages/Panel/Context/UserInfoContext';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {

    const { userInfo, fetchUserInfo } = useUserInfo();

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        names: userInfo?.profile.names || "" ,
        lastNames: userInfo?.profile.lastNames || "",
        idNumber: userInfo?.profile.idNumber || "",
        phoneNumber: userInfo?.profile.phoneNumber || "",
        phonePrefix: userInfo?.profile.phonePrefix || "",
        pictureUrl: userInfo?.profile.pictureUrl || "",
        department: userInfo?.profile.department || "",
        municipality: userInfo?.profile.municipality || "",
    });



    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        console.log("printing ");
        console.log(data);
        patch(route('profile.update'));



    };

    const handleSelectProvince = (value) => {

       
        // With this id, we get the cities list
        httpClient.get(`https://api-colombia.com/api/v1/Department/${value}/cities`)
            .then(response => {setCities(response.data)})
            .catch(error => console.log(error));
            console.log(data);

       // Save province and city values by their respective names instead of id's
        httpClient.get(`https://api-colombia.com/api/v1/Department/${value}`)
            .then(response => setData('department',response.data.name))
            .catch(error => console.log(error));
        
    };

    const handleSelectCity = (value) => {
        httpClient.get(`https://api-colombia.com/api/v1/City/${value}`)
            .then(response => setData('municipality', response.data.name))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        httpClient.get('https://api-colombia.com/api/v1/Department')
            .then(response => setProvinces(response.data))
            .catch(error => console.log(error));
    }, []);


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Información del perfil</h2>

                <p className="mt-1 text-sm text-gray-600">
                Actualice la información del perfil y la dirección de correo electrónico de su cuenta.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">


            <div className='mt-4'>
                        <InputLabel htmlFor="name" value="Nombre" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.names}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('names', e.target.value )}
                            required
                        />
                        <InputError message={errors.names} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="lastNames" value="Apellidos del usuario" />

                        <TextInput
                            id="lastNames"
                            type="text"
                            name="lastNames"
                            value={data.lastNames}
                            className="mt-1 block w-full"
                            autoComplete="lastNames"
                            onChange={(e) => setData('lastNames',e.target.value)}
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
                            value={data.phoneNumber}
                            className="mt-1 block w-full"
                            autoComplete="phoneNumber"
                            onChange={(e) => setData('phoneNumber',e.target.value)}
                        />

                        <InputError message={errors.phoneNumber} className="mt-2" />
                    </div>
                   <div className="mt-4">
                        <InputLabel htmlFor="idNumber" value="Cédula del usuario" />

                        <TextInput
                            id="idNumber"
                            type="text"
                            name="idNumber"
                            value={data.idNumber}
                            className="mt-1 block w-full"
                            autoComplete="idNumber"
                            onChange={(e) => setData('idNumber',e.target.value)}
                            required
                        />
                        <InputError message={errors.idNumber} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="department" value="Departamento"  />
                        
                        <Select id="department" options={provinces} onSelect={handleSelectProvince} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="municipality" value="Municipio"  />
                        
                        <Select id="municipality" options={cities} onSelect={handleSelectCity} />
                    </div>



                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Actualizar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Actualizada.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
