import React from 'react';
import { Head, Link } from '@inertiajs/react';
//import { Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white font-display flex overflow-hidden">
            <Head title="Panel de Control" />

            
            
            {/* SIDEBAR (Escritorio) */}
            <aside className="hidden lg:flex flex-col w-72 border-r border-border-green bg-surface-dark fixed h-full z-10">
                <div className="p-6 flex flex-col h-full justify-between">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-3xl">forest</span>
                            <h2 className="text-xl font-bold tracking-tight">HunterLog</h2>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-black/20 p-3 rounded-xl border border-border-green">
                            <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <h1 className="text-sm font-bold truncate">{auth.user.name}</h1>
                                <p className="text-text-muted text-xs truncate">Cazador</p>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-2 mt-2">
                            <Link href={route('dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="text-sm font-bold">Panel de Control</span>
                            </Link>
                            <Link href={route('diario.index')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors">
                                <span className="material-symbols-outlined">book_2</span>
                                <span className="text-sm font-medium">Diario</span>
                            </Link>
                            <Link href={route('armeria.index')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors">
                                <span className="material-symbols-outlined">atr</span>
                                <span className="text-sm font-medium">Armería</span>
                            </Link>
                            <Link href={route('mercado.index')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors">
                                <span className="material-symbols-outlined">storefront</span>
                                <span className="text-sm font-medium">Mercado</span>
                            </Link>
                        </nav>
                    </div>
                    
                    <Link method="post" href={route('logout')} as="button" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors w-full">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="text-sm font-medium">Cerrar Sesión</span>
                    </Link>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 lg:ml-72 flex flex-col p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full gap-8 overflow-y-auto">
                
                {/* Header Móvil */}
                <div className="lg:hidden flex justify-between items-center mb-4">
                     <span className="material-symbols-outlined text-primary text-3xl">forest</span>
                     <Link method="post" href={route('logout')} className="text-sm text-red-400">Salir</Link>
                </div>

                <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Resumen de Actividad</h1>
                        <p className="text-text-muted text-base md:text-lg">Bienvenido de nuevo, {auth.user.name}.</p>
                    </div>
                    <Link href={route('diario.create')} className="bg-primary hover:bg-primary-dark text-black font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        Registrar Jornada
                    </Link>
                </section>

                {/* --- STATS CARDS --- */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Stat 1 */}
                    <div className="bg-surface-dark border border-border-green p-6 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-6xl text-white">pets</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <p className="text-text-muted font-medium text-sm uppercase tracking-wider">Total Piezas</p>
                            <span className="text-4xl font-black text-white">{stats.piezas || 0}</span>
                        </div>
                    </div>
                    {/* Stat 2 */}
                    <div className="bg-surface-dark border border-border-green p-6 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-6xl text-white">calendar_month</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <p className="text-text-muted font-medium text-sm uppercase tracking-wider">Jornadas</p>
                            <span className="text-4xl font-black text-white">{stats.jornadas || 0}</span>
                        </div>
                    </div>
                    {/* Stat 3 */}
                    <div className="bg-surface-dark border border-border-green p-6 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-6xl text-white">inventory_2</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <p className="text-text-muted font-medium text-sm uppercase tracking-wider">Armas en Inventario</p>
                            <span className="text-4xl font-black text-white">{stats.armas || 0}</span>
                        </div>
                    </div>
                </section>

                {/* ACCIONES RÁPIDAS */}
                <section className="grid grid-cols-1 gap-6">
                    <h3 className="text-lg font-bold text-white">Accesos Directos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href={route('armeria.index')} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-surface-dark border border-border-green hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors text-primary">
                                <span className="material-symbols-outlined">add_a_photo</span>
                            </div>
                            <span className="font-bold text-sm text-white">Nueva Arma</span>
                        </Link>
                        <Link href={route('diario.create')} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-surface-dark border border-border-green hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors text-primary">
                                <span className="material-symbols-outlined">add_location_alt</span>
                            </div>
                            <span className="font-bold text-sm text-white">Nueva Jornada</span>
                        </Link>
                        <Link href={route('mercado.index')} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-surface-dark border border-border-green hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors text-primary">
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                            <span className="font-bold text-sm text-white">Ver Mercado</span>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}