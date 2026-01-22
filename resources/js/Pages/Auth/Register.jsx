import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => { reset('password', 'password_confirmation'); };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen w-full flex bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            <Head title="Registro" />

            <div className="hidden lg:flex lg:w-1/2 relative bg-surface-dark overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533282292723-53d9e2621ec1?q=80&w=1974&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#152211] via-[#152211]/60 to-transparent"></div>
                <div className="relative z-10 flex flex-col justify-between w-full h-full p-16">
                    <div className="flex items-center gap-3 text-white">
                        <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
                        <h2 className="text-white text-2xl font-bold">HunterLog</h2>
                    </div>
                    <h1 className="text-5xl font-black text-white">Únete a la comunidad de caza más grande.</h1>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-24 bg-background-dark overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex border-b border-[#3f6732] mb-6">
                        <Link href={route('login')} className="flex-1 text-center border-b-[3px] border-transparent text-[#a0c992] hover:text-white pb-3 pt-4 font-bold transition-colors">Iniciar Sesión</Link>
                        <div className="flex-1 text-center border-b-[3px] border-primary text-white pb-3 pt-4 font-bold cursor-default">Registrarse</div>
                    </div>

                    <h2 className="text-2xl font-bold text-white">Crear cuenta nueva</h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-white">Nombre Completo</label>
                            <input type="text" className="block w-full rounded-lg border border-[#3f6732] bg-surface-dark p-3 text-white focus:ring-primary" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            <span className="text-red-500 text-xs">{errors.name}</span>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-white">Correo Electrónico</label>
                            <input type="email" className="block w-full rounded-lg border border-[#3f6732] bg-surface-dark p-3 text-white focus:ring-primary" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                            <span className="text-red-500 text-xs">{errors.email}</span>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-white">Contraseña</label>
                            <input type="password" className="block w-full rounded-lg border border-[#3f6732] bg-surface-dark p-3 text-white focus:ring-primary" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                            <span className="text-red-500 text-xs">{errors.password}</span>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-white">Confirmar Contraseña</label>
                            <input type="password" className="block w-full rounded-lg border border-[#3f6732] bg-surface-dark p-3 text-white focus:ring-primary" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required />
                        </div>

                        <button disabled={processing} className="w-full rounded-lg bg-primary py-3 px-4 text-sm font-bold text-[#152211] hover:bg-primary-dark transition-all">Crear Cuenta</button>
                    </form>
                </div>
            </div>
        </div>
    );
}