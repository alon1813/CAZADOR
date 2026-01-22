import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, stats }) {
    const user = auth.user;

    // Formulario Principal
    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        licencia_caza: user.licencia_caza || '',
        ubicacion: user.ubicacion || '',
        biografia: user.biografia || '',
    });

    // Formulario Preferencias (Toggles)
    const { data: prefData, setData: setPrefData, patch: patchPref } = useForm({
        notificaciones_veda: Boolean(user.notificaciones_veda),
        perfil_publico: Boolean(user.perfil_publico),
    });

    const submitInfo = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    // Función para guardar preferencias automáticamente al hacer click en el toggle
    const togglePreference = (field) => {
        const newValue = !prefData[field];
        setPrefData(field, newValue);
        // Enviamos la petición al servidor inmediatamente
        // Nota: En una app real, idealmente usarías un endpoint específico para preferencias, 
        // pero aquí reutilizamos profile.update
        // Creamos un objeto temporal para enviar solo ese campo o mezclado
        // Para simplificar hoy, usaremos el botón de guardar general o un efecto.
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col">
            <Head title="Perfil de Usuario" />

            {/* HEADER DE NAVEGACIÓN */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-border-green bg-background-dark px-4 md:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-4 md:gap-8">
                    {/* LOGO: Al hacer clic lleva al Dashboard (Inicio) */}
                    <Link href={route('dashboard')} className="flex items-center gap-4 text-white hover:opacity-80 transition-opacity">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined text-[32px]">verified_user</span>
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">HunterLog</h2>
                    </Link>
                    
                    <div className="hidden md:flex items-center gap-9">
                        <Link href={route('dashboard')} className="text-white text-sm font-medium hover:text-primary transition-colors">Inicio</Link>
                        <Link href={route('diario.index')} className="text-white text-sm font-medium hover:text-primary transition-colors">Diario</Link>
                        <Link href={route('armeria.index')} className="text-white text-sm font-medium hover:text-primary transition-colors">Armería</Link>
                        <Link href={route('mercado.index')} className="text-white text-sm font-medium hover:text-primary transition-colors">Mercado</Link>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-white text-sm font-bold hidden md:block">{user.name}</div>
                    <div className="size-10 rounded-full bg-surface-dark border border-primary flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 md:px-10 py-8">
                
                <div className="flex flex-col gap-3 py-4">
                    <h1 className="text-white text-4xl font-black">Perfil de Usuario</h1>
                    <p className="text-gray-400">Gestiona tu información personal, seguridad y configuración.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mt-6">
                    
                    {/* SIDEBAR IZQUIERDO */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-surface-dark rounded-xl p-4 flex flex-col gap-6 sticky top-24 border border-border-green">
                            <div className="flex items-center gap-3 pb-4 border-b border-border-green">
                                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border-2 border-primary">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-white text-base font-bold">{user.name}</h3>
                                    <p className="text-primary text-xs">Cazador</p>
                                </div>
                            </div>
                            
                            <nav className="flex flex-col gap-2">
                                <button className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/20 border border-primary/20 text-white font-bold text-sm text-left">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    Información
                                </button>
                                <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm font-medium text-left">
                                    <span className="material-symbols-outlined">lock</span>
                                    Seguridad
                                </button>
                            </nav>

                            <div className="mt-auto pt-4 border-t border-border-green">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Resumen</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-background-dark p-3 rounded-lg text-center">
                                        <span className="block text-xl font-bold text-primary">{stats.jornadas}</span>
                                        <span className="text-[10px] text-gray-400">Jornadas</span>
                                    </div>
                                    <div className="bg-background-dark p-3 rounded-lg text-center">
                                        <span className="block text-xl font-bold text-white">{stats.armas}</span>
                                        <span className="text-[10px] text-gray-400">Armas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* COLUMNA DERECHA */}
                    <div className="flex-1 flex flex-col gap-6">
                        
                        {/* HEADER TARJETA */}
                        <div className="bg-surface-dark rounded-xl p-6 border border-border-green">
                            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="size-24 rounded-full bg-background-dark border-4 border-background-dark shadow-xl flex items-center justify-center text-4xl text-white font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-white text-2xl md:text-3xl font-bold">{user.name}</h2>
                                        <p className="text-primary text-base font-medium mt-1">{user.licencia_caza ? 'Licencia Verificada' : 'Usuario Registrado'}</p>
                                        <div className="flex items-center gap-1 mt-1 text-gray-400 text-sm">
                                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                                            <span>{user.ubicacion || 'Ubicación no definida'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FORMULARIO DE EDICIÓN */}
                        <div className="bg-surface-dark rounded-xl border border-border-green overflow-hidden">
                            <div className="p-6 border-b border-border-green">
                                <h3 className="text-white text-xl font-bold">Información Personal</h3>
                                <p className="text-gray-400 text-sm mt-1">Actualiza tus datos y tu información pública.</p>
                            </div>
                            
                            <form onSubmit={submitInfo} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-300">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-lg bg-background-dark border-transparent focus:border-primary focus:ring-0 text-white placeholder-gray-500"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <span className="text-red-500 text-xs">{errors.name}</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-300">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        className="w-full rounded-lg bg-background-dark border-transparent focus:border-primary focus:ring-0 text-white placeholder-gray-500"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <span className="text-red-500 text-xs">{errors.email}</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-300">Nº Licencia de Caza</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                            <span className="material-symbols-outlined text-[20px]">badge</span>
                                        </span>
                                        <input 
                                            type="text" 
                                            className="w-full rounded-lg bg-background-dark border-transparent focus:border-primary focus:ring-0 text-white pl-10 placeholder-gray-500"
                                            value={data.licencia_caza}
                                            onChange={(e) => setData('licencia_caza', e.target.value)}
                                            placeholder="Ej: ES-29384710"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-300">Ubicación</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                                        </span>
                                        <input 
                                            type="text" 
                                            className="w-full rounded-lg bg-background-dark border-transparent focus:border-primary focus:ring-0 text-white pl-10 placeholder-gray-500"
                                            value={data.ubicacion}
                                            onChange={(e) => setData('ubicacion', e.target.value)}
                                            placeholder="Ej: Toledo, España"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-300">Biografía</label>
                                    <textarea 
                                        className="w-full rounded-lg bg-background-dark border-transparent focus:border-primary focus:ring-0 text-white placeholder-gray-500 resize-none h-32"
                                        value={data.biografia}
                                        onChange={(e) => setData('biografia', e.target.value)}
                                        placeholder="Cuéntanos un poco sobre tu experiencia..."
                                    ></textarea>
                                </div>

                                <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-border-green">
                                    {status === 'profile-updated' && (
                                        <p className="text-primary text-sm font-medium self-center animate-pulse">Guardado correctamente.</p>
                                    )}
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-primary hover:bg-primary-dark text-[#152210] text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-primary/20"
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* ZONA DE PELIGRO */}
                        <div className="bg-red-950/20 rounded-xl border border-red-900/50 p-6">
                            <h3 className="text-red-500 text-lg font-bold mb-2">Zona de Peligro</h3>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <p className="text-gray-400 text-sm">Si eliminas tu cuenta, perderás todos tus registros. Esta acción no se puede deshacer.</p>
                                <Link 
                                    href={route('profile.destroy')} 
                                    method="delete" 
                                    as="button"
                                    className="whitespace-nowrap px-4 py-2 border border-red-800 text-red-500 hover:bg-red-900/40 rounded-lg text-sm font-bold transition-colors"
                                >
                                    Eliminar Cuenta
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}