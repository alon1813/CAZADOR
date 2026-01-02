import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, jornadas }) {
    
    // Función auxiliar para contar especies (ej: Jabalí: 2, Ciervo: 1)
    const resumirCapturas = (capturas) => {
        if (!capturas || capturas.length === 0) return 'Sin capturas';
        
        const conteo = {};
        capturas.forEach(c => {
            conteo[c.especie] = (conteo[c.especie] || 0) + 1;
        });

        return Object.entries(conteo).map(([especie, num]) => (
            <span key={especie} className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded mr-2 border border-primary/20">
                {num} {especie}
            </span>
        ));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white">
            <Head title="Mis Jornadas" />

            {/* HEADER */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-green bg-background-dark/95 backdrop-blur-sm px-6 py-3 lg:px-10">
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                    <h2 className="text-white text-xl font-bold">HunterLog</h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href={route('armeria.index')} className="text-text-muted hover:text-white transition-colors text-sm font-medium">Mi Armero</Link>
                    <Link href={route('diario.index')} className="text-primary text-sm font-bold border-b-2 border-primary">Mis Jornadas</Link>
                </nav>
                <div className="size-10 rounded-full bg-surface-dark border-2 border-border-green flex items-center justify-center text-white font-bold">
                     {auth.user.name.charAt(0)}
                </div>
            </header>

            {/* CONTENT */}
            <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:px-12 flex flex-col gap-8">
                
                <div className="flex justify-between items-end border-b border-border-green pb-6">
                    <div>
                        <h1 className="text-white text-3xl md:text-4xl font-black mb-2">Diario de Caza</h1>
                        <p className="text-text-muted">Historial de tus salidas, ubicaciones y trofeos.</p>
                    </div>
                    <Link href={route('diario.create')} className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-lg shadow-[0_0_15px_rgba(73,236,19,0.3)] transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined">add_location_alt</span>
                        Registrar Salida
                    </Link>
                </div>

                {jornadas.length === 0 ? (
                    <div className="text-center py-20 bg-surface-dark rounded-xl border border-border-green border-dashed">
                        <span className="material-symbols-outlined text-6xl text-text-muted mb-4 opacity-50">forest</span>
                        <p className="text-xl text-white font-bold">Aún no hay registros</p>
                        <p className="text-text-muted mt-2">¿Saliste al campo hoy? Registra tu primera jornada.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {jornadas.map((jornada) => (
                            <div key={jornada.id} className="group bg-surface-dark border border-border-green rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 flex flex-col md:flex-row h-auto md:h-56">
                                
                                {/* Imagen Izquierda (o Mapa estático si no hay imagen) */}
                                <div className="w-full md:w-1/3 relative bg-black h-48 md:h-full overflow-hidden">
                                    {jornada.imagen_ruta ? (
                                        <img 
                                            src={`/storage/${jornada.imagen_ruta}`} 
                                            alt="Foto jornada" 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#101a0e]">
                                            <span className="material-symbols-outlined text-4xl text-border-green">map</span>
                                            <span className="text-xs text-text-muted mt-2 font-mono">
                                                {jornada.latitud.toFixed(3)}, {jornada.longitud.toFixed(3)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                                        {new Date(jornada.fecha).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Contenido Derecha */}
                                <div className="flex-1 p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-1">
                                                {jornada.ubicacion_texto}
                                            </h3>
                                        </div>
                                        <p className="text-text-muted text-sm line-clamp-2 mb-4">
                                            {jornada.comentarios || 'Sin observaciones registradas.'}
                                        </p>
                                        
                                        {/* Resumen de Capturas */}
                                        <div className="flex flex-wrap gap-y-2">
                                            {resumirCapturas(jornada.capturas)}
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-border-green mt-4 pt-3 flex justify-between items-center text-xs text-text-muted">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">cloud</span>
                                            --°C
                                        </span>
                                        <span className="font-mono">ID: #{jornada.id.toString().padStart(4, '0')}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}