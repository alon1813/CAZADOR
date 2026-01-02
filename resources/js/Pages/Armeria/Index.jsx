import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ auth, misArmas }) {
    // --- Lógica del Formulario (Backend) ---
    const { data, setData, post, processing, reset, errors } = useForm({
        nombre: '',
        tipo: 'Rifle',
        calibre: '',
        notas: '',
        imagen: null,
    });
    
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const enviarFormulario = (e) => {
        e.preventDefault();
        post(route('armeria.store'), {
            onSuccess: () => {
                reset();
                setMostrarFormulario(false);
            },
        });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white selection:bg-primary selection:text-black">
            <Head title="Mi Armería" />

            {/* --- HEADER (Copiado de tu diseño) --- */}
            <header className="sticky top-0 z-50 w-full border-b border-border-green bg-background-dark/95 backdrop-blur-md">
                <div className="px-4 md:px-10 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-8 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">crossword</span>
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight hidden md:block">Armería Digital</h2>
                    </div>
                    
                    <nav className="hidden lg:flex items-center gap-9 flex-1 justify-center">
                        <Link href={route('armeria.index')} className="text-primary text-sm font-bold border-b-2 border-primary pb-0.5">Mi Armero</Link>
                        <Link href={route('diario.index')} className="text-text-muted hover:text-white transition-colors text-sm font-medium">Jornadas</Link>
                        <a href="#" className="text-text-muted hover:text-white transition-colors text-sm font-medium">Mercado</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-gray-700 border-2 border-border-green flex items-center justify-center text-white font-bold">
                            {auth.user.name.charAt(0)}
                        </div>
                    </div>
                </div>
            </header>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:px-12 flex flex-col gap-6">
                
                {/* Encabezado de Página */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border-green pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
                            <span>Inicio</span>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-primary">Mi Armero</span>
                        </div>
                        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Mi Inventario</h1>
                        <p className="text-text-muted text-base">Gestiona tu colección y mantenimiento.</p>
                    </div>
                    
                    <button 
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-black px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(73,236,19,0.2)]"
                    >
                        <span className="material-symbols-outlined">{mostrarFormulario ? 'close' : 'add'}</span>
                        <span>{mostrarFormulario ? 'Cancelar' : 'Registrar Arma'}</span>
                    </button>
                </div>

                {/* --- SECCIÓN DE FORMULARIO (Se muestra al hacer clic en el botón) --- */}
                {mostrarFormulario && (
                    <div className="bg-surface-dark border border-border-green rounded-xl p-6 animate-fade-in-down mb-6">
                        <h3 className="text-white text-xl font-bold mb-4">Nueva Ficha Técnica</h3>
                        <form onSubmit={enviarFormulario} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-text-muted text-sm mb-1">Nombre / Modelo</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-background-dark border border-border-green rounded-lg text-white focus:border-primary focus:ring-primary"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                />
                                <span className="text-red-500 text-xs">{errors.nombre}</span>
                            </div>
                            
                            <div>
                                <label className="block text-text-muted text-sm mb-1">Tipo</label>
                                <select 
                                    className="w-full bg-background-dark border border-border-green rounded-lg text-white focus:border-primary focus:ring-primary"
                                    value={data.tipo}
                                    onChange={e => setData('tipo', e.target.value)}
                                >
                                    <option value="Rifle">Rifle</option>
                                    <option value="Escopeta">Escopeta</option>
                                    <option value="Arco">Arco</option>
                                    <option value="Óptica">Óptica</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-text-muted text-sm mb-1">Calibre</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-background-dark border border-border-green rounded-lg text-white focus:border-primary focus:ring-primary"
                                    value={data.calibre}
                                    onChange={e => setData('calibre', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-text-muted text-sm mb-1">Foto</label>
                                <input 
                                    type="file" 
                                    className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-black hover:file:bg-primary-dark"
                                    onChange={e => setData('imagen', e.target.files[0])}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-text-muted text-sm mb-1">Notas</label>
                                <textarea 
                                    className="w-full bg-background-dark border border-border-green rounded-lg text-white focus:border-primary focus:ring-primary"
                                    value={data.notas}
                                    onChange={e => setData('notas', e.target.value)}
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="md:col-span-2 bg-white text-black font-bold py-2 rounded hover:bg-gray-200"
                            >
                                Guardar en Inventario
                            </button>
                        </form>
                    </div>
                )}

                {/* --- STATS OVERVIEW --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-surface-dark border border-border-green rounded-xl p-5 flex flex-col gap-1 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-6xl text-white">inventory_2</span>
                        </div>
                        <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Total Artículos</p>
                        <p className="text-white text-3xl font-bold">{misArmas.length}</p>
                    </div>
                    {/* (Puedes añadir más stats aquí como en tu diseño original) */}
                </div>

                {/* --- GRID DE ARMAS (Tus datos reales con el Diseño Nuevo) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
                    
                    {misArmas.map((arma) => (
                        <div key={arma.id} className="group bg-surface-dark border border-border-green rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                            <div className="relative h-56 w-full overflow-hidden bg-black">
                                <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10 uppercase tracking-wider">
                                    {arma.tipo}
                                </div>
                                
                                {arma.imagen_ruta ? (
                                    <img 
                                        src={`/storage/${arma.imagen_ruta}`} 
                                        alt={arma.nombre} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-background-dark text-text-muted">
                                        <span className="material-symbols-outlined text-6xl opacity-20">image_not_supported</span>
                                    </div>
                                )}
                                
                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-surface-dark to-transparent"></div>
                            </div>

                            <div className="p-5 flex flex-col gap-4 flex-1">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{arma.nombre}</h3>
                                        <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-xs font-bold border border-primary/20">ACTIVO</span>
                                    </div>
                                    <p className="text-text-muted text-sm">{arma.notas || 'Sin notas adicionales'}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm border-t border-white/10 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-text-muted text-xs">Calibre</span>
                                        <span className="text-white font-medium">{arma.calibre || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-text-muted text-xs">Registro</span>
                                        <span className="text-white font-medium">{new Date(arma.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Botón Card para añadir (Estilo vacío) */}
                    <div 
                        onClick={() => setMostrarFormulario(true)}
                        className="group border-2 border-dashed border-border-green rounded-xl flex flex-col items-center justify-center text-center p-8 hover:bg-surface-dark/30 hover:border-primary/50 transition-all cursor-pointer min-h-[400px]"
                    >
                        <div className="size-16 rounded-full bg-surface-dark border border-border-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:border-primary">
                            <span className="material-symbols-outlined text-4xl text-primary">add</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Añadir Equipamiento</h3>
                        <p className="text-text-muted text-sm max-w-[200px]">Registra una nueva arma en tu inventario digital.</p>
                    </div>

                </div>
            </main>
        </div>
    );
}