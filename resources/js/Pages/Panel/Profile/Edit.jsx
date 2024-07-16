import DeleteUserForm from '@/Pages/Panel/Profile/Components/DeleteUserForm';
import UpdatePasswordForm from '@/Pages/Panel/Profile/Components/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Panel/Profile/Components/UpdateProfileInformationForm';
import UpdateProfileImageForm from '@/Pages/Panel/Profile/Components/UpdateProfileImageForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Editar perfil" />

            <div className="w-full h-full  justify-center items-center ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg flex flex-col lg:flex-row lg:space-x-6">
                        <UpdateProfileImageForm className="max-w-xl w-full mt-6 lg:mt-0" />
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl w-full"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}
