import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen w-full flex bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
            <Head title="Iniciar Sesión" />

            {/* --- LADO IZQUIERDO: IMAGEN Y BRANDING --- */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-surface-dark overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#152211] via-[#152211]/60 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col justify-between w-full h-full p-12 lg:p-16">
                    <div className="flex items-center gap-3 text-white">
                        <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
                        <h2 className="text-white text-2xl font-bold tracking-tight">HunterLog</h2>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-white">
                            La herramienta definitiva para el cazador moderno.
                        </h1>
                        <p className="text-lg text-gray-300 max-w-md">
                            Gestiona tus jornadas, registra avistamientos y organiza tu equipo de manera eficiente.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- LADO DERECHO: FORMULARIO --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo Móvil */}
                    <div className="flex lg:hidden items-center gap-2 mb-8 text-white">
                        <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                        <span className="text-xl font-bold">HunterLog</span>
                    </div>

                    {/* Tabs Login/Registro */}
                    <div className="flex border-b border-[#3f6732] mb-6">
                        <div className="flex-1 text-center border-b-[3px] border-primary text-white pb-3 pt-4 font-bold cursor-default">
                            Iniciar Sesión
                        </div>
                        <Link href={route('register')} className="flex-1 text-center border-b-[3px] border-transparent text-[#a0c992] hover:text-white pb-3 pt-4 font-bold transition-colors">
                            Registrarse
                        </Link>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-white">Bienvenido de nuevo</h2>
                        <p className="text-[#a0c992] text-sm">Ingresa tus credenciales para acceder a tu diario.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-white">Correo Electrónico</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-3 text-[#a0c992]">mail</span>
                                <input 
                                    type="email" 
                                    className="block w-full rounded-lg border border-[#3f6732] bg-surface-dark pl-10 p-3 text-white focus:border-primary focus:ring-primary"
                                    placeholder="ejemplo@cazador.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <span className="text-red-500 text-xs">{errors.email}</span>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-white">Contraseña</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-3 text-[#a0c992]">lock</span>
                                <input 
                                    type="password" 
                                    className="block w-full rounded-lg border border-[#3f6732] bg-surface-dark pl-10 p-3 text-white focus:border-primary focus:ring-primary"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            <span className="text-red-500 text-xs">{errors.password}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-[#3f6732] bg-surface-dark text-primary focus:ring-primary"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-[#a0c992]">Recordarme</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-sm font-medium text-primary hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        <button disabled={processing} className="w-full rounded-lg bg-primary py-3 px-4 text-sm font-bold text-[#152211] shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                            Acceder
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#a0c992]">
                        ¿No tienes una cuenta? <Link href={route('register')} className="font-bold text-white hover:underline decoration-primary">Regístrate ahora</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}