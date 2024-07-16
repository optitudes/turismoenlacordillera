import { useEffect, useState,Fragment} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Checkbox from '@/Components/Checkbox';
import MyMap from '@/Components/Map/Maps'
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import QuestionPopup from '@/Components/QuestionPopup';
import { Head, Link, useForm } from '@inertiajs/react';
import httpClient from "@/Utils/httpClient";
import usePasswordToggle from '@/CustomHooks/usePasswordToggle';
import Select from '@/Components/Select'


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
            province: "",
            city: "",
        }
    });

    const [isEntrepreneur, setIsEntrepreneur] = useState(false);
    const [ventureMapPosition,setVentureMapPosition] = useState(null);
    const [passwordInputType, toggleIcon] = usePasswordToggle();
    const [passwordConfirmationInputType, toggleIconConfirmation] = usePasswordToggle();

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState();
    const [onAcceptPopup, setOnAcceptPopup] = useState();
    const [popupMessage,setPopupMessage] = useState("");

    const handleSelectProvince = (value) => {
        // Here, value stores the province's id
        setSelectedProvince(value);

        // With this id, we get the cities list
        httpClient.get(`https://api-colombia.com/api/v1/Department/${value}/cities`)
            .then(response => {setCities(response.data)})
            .catch(error => console.log(error));
    };

    const handleSelectCity = (value) => {
        // value stores the city's id
        setSelectedCity(value);
    };

    useEffect(() => {
        httpClient.get('https://api-colombia.com/api/v1/Department')
            .then(response => setProvinces(response.data))
            .catch(error => console.log(error));

        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        
        if(data.ventureInfo !== null && data.ventureInfo.name !== "") {
            data.micrositeInfo.name = data.ventureInfo.name;
        }

        // Save province and city values by their respective names instead of id's
        httpClient.get(`https://api-colombia.com/api/v1/Department/${selectedProvince}`)
            .then(response => data.profileInfo.department = response.data.name)
            .catch(error => console.log(error));

        httpClient.get(`https://api-colombia.com/api/v1/City/${selectedCity}`)
            .then(response => data.profileInfo.municipality = response.data.name)
            .catch(error => console.log(error));

        
        data.profileInfo.city = selectedCity;

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
            } else {
                console.log(response.data);
            }
            setPopupMessage(response.data.message);
            setOnAcceptPopup(() => ()=> {window.location.href = "/";});
            setOnCancelPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
        } catch (error) {
            setPopupMessage(JSON.parse(error.request.response).message);
            setOnAcceptPopup(() => () => { setIsOpenPopup(false) });
            setOnCancelPopup(() => () => { setIsOpenPopup(false) });
            setIsOpenPopup(true);
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

                    <div className="mt-4 relative">
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type={passwordInputType}
                            name="password"
                            value={data.password}
                            className="mt-1 w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('userInfo', { ...data.userInfo, password: e.target.value })}
                            required
                        />
                        <span className='absolute inset-y-0 right-0 flex items-center pr-3 ps-3 mt-1 pt-6 cursor-pointer'>{toggleIcon}</span>

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 relative">
                        <InputLabel htmlFor="password_confirmation" value="Confirma la contraseña" />

                        <TextInput
                            id="password_confirmation"
                            type={passwordConfirmationInputType}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('userInfo', { ...data.userInfo, password_confirmation: e.target.value })}
                            required
                        />
                        <span className='absolute inset-y-0 right-0 flex items-center pr-3 ps-3 mt-1 pt-6 cursor-pointer'>{toggleIconConfirmation}</span>

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

                    <div className="mt-4">
                        <InputLabel htmlFor="province" value="Departamento"  />
                        
                        <Select id="province" options={provinces} onSelect={handleSelectProvince} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="city" value="Municipio"  />
                        
                        <Select id="city" options={cities} onSelect={handleSelectCity} />
                    </div>
                    

                    <div className="p-4">
                        <label className="inline-flex items-center">
                            <Checkbox
                                checked={isEntrepreneur}
                                onChange={handleCheckboxIsEntrepreneurChange}
                                className="form-checkbox text-indigo-600 h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Eres emprendedor(a)?</span>
                        </label>
                    </div>
                    {isEntrepreneur?
                    <div>
                        <div>
                            <InputLabel htmlFor="micrositeName" value="Nombre del micrositio (emprendimiento)" />

                            <TextInput
                                id="micrositeName"
                                name="micrositeName"
                                value={data.ventureInfo.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('ventureInfo', { ...data.ventureInfo, name: e.target.value })}
                                required
                            />

                            <InputError message={errors.micrositeName} className="mt-2" />
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
            <QuestionPopup
            isOpen = {isOpenPopup}
            question= {popupMessage}
            onAccept={onAcceptPopup}
            onCancel={onCancelPopup}
            />
        </>
    );
}
