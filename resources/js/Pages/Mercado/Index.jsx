import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
//import { Link } from '@inertiajs/react';

export default function Index({ auth, anuncios, filtros }) {
    
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false); // Renombrado para claridad
    
    // --- NUEVO: Estados para el contacto ---
    const [anuncioAContactar, setAnuncioAContactar] = useState(null);
    const { data: datosContacto, setData: setDatosContacto, post: enviarContacto, processing: enviandoContacto, reset: limpiarContacto, errors: erroresContacto } = useForm({
        mensaje: ''
    });

    const abrirModalContacto = (anuncio) => {
        setAnuncioAContactar(anuncio);
        setDatosContacto('mensaje', `Hola, estoy interesado en tu ${anuncio.titulo}. ¿Sigue disponible?`);
    };

    const enviarFormularioContacto = (e) => {
        e.preventDefault();
        enviarContacto(route('mercado.contactar', anuncioAContactar.id), {
            onSuccess: () => {
                limpiarContacto();
                setAnuncioAContactar(null);
                alert('Mensaje enviado con éxito'); // Opcional: Feedback visual
            }
        });
    };
    
    // Formulario para publicar
    const { data, setData, post, processing, reset, errors } = useForm({
        titulo: '',
        precio: '',
        categoria: 'Armas de Fuego',
        estado: 'Usado',
        ubicacion: '',
        descripcion: '',
        imagen: null
    });

    const enviarAnuncio = (e) => {
        e.preventDefault();
        post(route('mercado.store'), {
            onSuccess: () => {
                reset();
                setMostrarModal(false);
            }
        });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white overflow-x-hidden">
            <Head title="Mercado" />

            <header className="...">
                <div className="flex items-center gap-4">
                    {/* LOGO QUE LLEVA AL INICIO */}
                    <Link href={route('dashboard')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                        <h2 className="text-white text-xl font-bold">HunterLog</h2>
                    </Link>
                </div>
                
                <div className="flex flex-1 justify-end gap-8">
                    <nav className="hidden md:flex items-center gap-9">
                        {/* ENLACES CORRECTOS */}
                        <Link href={route('dashboard')} className="text-white text-sm font-medium hover:text-primary transition-colors">Inicio</Link>
                        <Link href={route('diario.index')} className="text-white text-sm font-medium hover:text-primary transition-colors">Diario</Link>
                        <Link href={route('armeria.index')} className="text-white text-sm font-medium hover:text-primary transition-colors">Armería</Link>
                        <Link href={route('mercado.index')} className="text-white text-sm font-medium hover:text-primary transition-colors">Mercado</Link>
                        <Link href={route('blog.index')} className="text-white text-sm font-medium hover:text-primary transition-colors">Comunidad</Link>
                    </nav>

                    {/* AVATAR QUE LLEVA AL PERFIL */}
                    <Link href={route('profile.edit')} className="flex items-center justify-center">
                        <div className="size-10 rounded-full bg-surface-dark border border-primary flex items-center justify-center text-white font-bold hover:bg-primary hover:text-black transition-colors">
                            {auth.user.name.charAt(0)}
                        </div>
                    </Link>
                </div>
            </header>

            {/* HERO SEARCH */}
            <div className="bg-background-dark relative py-12 px-4 md:px-10 lg:px-40 flex justify-center border-b border-border-dark">
                <div className="max-w-[960px] flex-1 flex flex-col items-center text-center gap-6 z-10">
                    <h1 className="text-white text-3xl md:text-5xl font-black leading-tight">Mercado de Segunda Mano</h1>
                    <p className="text-white/80 text-sm md:text-base font-normal max-w-2xl mx-auto">
                        Compra, vende e intercambia equipamiento con la comunidad.
                    </p>
                    {/* Barra de búsqueda visual (funcionalidad pendiente de implementar en frontend) */}
                    <div className="flex w-full max-w-2xl items-stretch rounded-lg h-12 shadow-lg shadow-black/20">
                        <div className="text-text-muted flex border border-border-dark bg-surface-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input className="flex w-full bg-surface-dark border-y border-border-dark text-white placeholder:text-text-muted px-3 h-full" placeholder="Buscar rifles, visores..." />
                        <button className="rounded-r-lg border border-border-dark border-l-0 bg-primary px-6 text-[#152211] font-bold hover:bg-opacity-90">Buscar</button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 px-4 md:px-10 lg:px-40 py-8 flex justify-center bg-background-dark">
                <div className="max-w-[1280px] w-full flex flex-col lg:flex-row gap-8">
                    
                    {/* FILTROS SIDEBAR (Visual) */}
                    <aside className="hidden lg:flex w-72 flex-col gap-6">
                        <div className="bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col gap-6">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">category</span> Categorías
                            </h3>
                            <div className="flex flex-col gap-2">
                                {['Armas de Fuego', 'Óptica', 'Ropa', 'Accesorios'].map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-border-dark bg-[#152211] group-hover:border-primary"></div>
                                        <span className="text-white text-sm">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* GRID RESULTADOS */}
                    <main className="flex-1 flex flex-col gap-6 min-w-0">
                        {anuncios.length === 0 ? (
                            <div className="text-center py-20 text-text-muted">
                                <span className="material-symbols-outlined text-6xl opacity-30">storefront</span>
                                <p className="mt-4">No hay anuncios activos. ¡Sé el primero en publicar!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {anuncios.map((anuncio) => (
                                    <div key={anuncio.id} className="group bg-surface-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
                                        <div className="relative h-48 overflow-hidden bg-black">
                                            {anuncio.imagen_ruta ? (
                                                <img src={`/storage/${anuncio.imagen_ruta}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-text-muted">
                                                    <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-[#152211]/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary border border-primary/20">
                                                {anuncio.estado}
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 flex flex-col gap-3 flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">{anuncio.titulo}</h3>
                                            </div>
                                            <p className="text-2xl font-black text-primary">{anuncio.precio}€</p>
                                            
                                            <div className="flex flex-col gap-1 mt-auto">
                                                <div className="flex items-center gap-1 text-text-muted text-sm">
                                                    <span className="material-symbols-outlined text-base">location_on</span>
                                                    <span>{anuncio.ubicacion}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="h-px bg-border-dark my-1"></div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white">
                                                        {anuncio.usuario.name.charAt(0)}
                                                    </div>
                                                    <span className="text-white text-xs font-bold">{anuncio.usuario.name}</span>
                                                </div>
                                                <button 
                                                    onClick={() => abrirModalContacto(anuncio)}
                                                    className="bg-[#152211] hover:bg-primary hover:text-black text-white text-xs font-bold py-1.5 px-3 rounded border border-border-dark transition-colors"
                                                >
                                                    Contactar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* --- MODAL PARA PUBLICAR ANUNCIO --- */}
            {mostrarModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-surface-dark border border-border-dark rounded-xl w-full max-w-2xl p-6 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6 border-b border-border-dark pb-4">
                            <h3 className="text-white text-xl font-bold">Publicar Nuevo Anuncio</h3>
                            <button onClick={() => setMostrarModal(false)} className="text-text-muted hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <form onSubmit={enviarAnuncio} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-white text-sm font-bold mb-1 block">Título del Anuncio</label>
                                <input type="text" className="w-full bg-background-dark border border-border-dark rounded-lg text-white" value={data.titulo} onChange={e => setData('titulo', e.target.value)} required />
                                <span className="text-red-500 text-xs">{errors.titulo}</span>
                            </div>

                            <div>
                                <label className="text-white text-sm font-bold mb-1 block">Precio (€)</label>
                                <input type="number" className="w-full bg-background-dark border border-border-dark rounded-lg text-white" value={data.precio} onChange={e => setData('precio', e.target.value)} required />
                            </div>

                            <div>
                                <label className="text-white text-sm font-bold mb-1 block">Categoría</label>
                                <select className="w-full bg-background-dark border border-border-dark rounded-lg text-white" value={data.categoria} onChange={e => setData('categoria', e.target.value)}>
                                    <option>Armas de Fuego</option>
                                    <option>Óptica</option>
                                    <option>Ropa</option>
                                    <option>Accesorios</option>
                                    <option>Vehículos</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-white text-sm font-bold mb-1 block">Estado</label>
                                <select className="w-full bg-background-dark border border-border-dark rounded-lg text-white" value={data.estado} onChange={e => setData('estado', e.target.value)}>
                                    <option>Nuevo</option>
                                    <option>Como Nuevo</option>
                                    <option>Usado</option>
                                    <option>Para Piezas</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-white text-sm font-bold mb-1 block">Ubicación</label>
                                <input type="text" className="w-full bg-background-dark border border-border-dark rounded-lg text-white" placeholder="Ej: Madrid" value={data.ubicacion} onChange={e => setData('ubicacion', e.target.value)} required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-white text-sm font-bold mb-1 block">Descripción</label>
                                <textarea className="w-full bg-background-dark border border-border-dark rounded-lg text-white h-24" value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} required></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-white text-sm font-bold mb-1 block">Foto Principal</label>
                                <input type="file" className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-black hover:file:bg-primary-dark cursor-pointer" onChange={e => setData('imagen', e.target.files[0])} accept="image/*" />
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-border-dark">
                                <button type="button" onClick={() => setMostrarModal(false)} className="px-4 py-2 text-white font-bold hover:bg-white/5 rounded-lg">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20">Publicar</button>
                            </div>
                        </form>
                    </div>
                </div>
                
            )}
            {/* --- MODAL DE CONTACTO --- */}
            {anuncioAContactar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-surface-dark border border-border-dark rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
                        <div className="flex justify-between items-center mb-4 border-b border-border-dark pb-4">
                            <h3 className="text-white text-lg font-bold">Contactar Vendedor</h3>
                            <button onClick={() => setAnuncioAContactar(null)} className="text-text-muted hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-sm text-text-muted">Estás contactando a <span className="text-white font-bold">{anuncioAContactar.usuario.name}</span> por el artículo:</p>
                            <div className="mt-2 p-3 bg-background-dark rounded border border-border-dark flex items-center gap-3">
                                {anuncioAContactar.imagen_ruta ? (
                                    <img src={`/storage/${anuncioAContactar.imagen_ruta}`} className="size-12 object-cover rounded" />
                                ) : (
                                    <div className="size-12 bg-gray-800 rounded flex items-center justify-center"><span className="material-symbols-outlined text-xs">image</span></div>
                                )}
                                <div>
                                    <p className="text-white font-bold text-sm">{anuncioAContactar.titulo}</p>
                                    <p className="text-primary font-bold text-xs">{anuncioAContactar.precio}€</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={enviarFormularioContacto} className="flex flex-col gap-4">
                            <div>
                                <label className="text-white text-sm font-bold mb-1 block">Tu Mensaje</label>
                                <textarea 
                                    className="w-full bg-background-dark border border-border-dark rounded-lg text-white h-32 focus:border-primary focus:ring-1 focus:ring-primary"
                                    value={datosContacto.mensaje}
                                    onChange={e => setDatosContacto('mensaje', e.target.value)}
                                    placeholder="Escribe tu consulta aquí..."
                                ></textarea>
                                <span className="text-red-500 text-xs">{erroresContacto.mensaje}</span>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setAnuncioAContactar(null)} className="px-4 py-2 text-white font-bold hover:bg-white/5 rounded-lg text-sm">Cancelar</button>
                                <button type="submit" disabled={enviandoContacto} className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20 text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">send</span>
                                    Enviar Mensaje
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}