import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ posts, filtros }) {
    const { auth } = usePage().props; // Para saber si mostramos avatar o botón login en el header

    // Categorías del diseño
    const categorias = ['Todos', 'Normativas', 'Seguridad', 'Conservación', 'Análisis'];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden">
            <Head title="Blog Comunitario" />

            {/* HEADER (Adaptado para usuario logueado o visitante) */}
            <header className="sticky top-0 z-50 w-full border-b border-border-green bg-background-dark/95 backdrop-blur px-4 md:px-10 lg:px-40 flex h-16 items-center justify-between">
                <div className="flex items-center gap-4 text-white">
                    <div className="size-8 text-primary">
                        <span className="material-symbols-outlined !text-[32px]">forest</span>
                    </div>
                    <Link href="/" className="text-white text-xl font-bold leading-tight hover:opacity-80">HunterLog</Link>
                </div>

                <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                    <nav className="flex items-center gap-9">
                        <Link href="/" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">Inicio</Link>
                        <Link href="/diario" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">Diario</Link>
                        <Link href="/armeria" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">Armería</Link>
                        <Link href={route('blog.index')} className="text-primary text-sm font-bold">Comunidad</Link>
                    </nav>
                    
                    <div className="h-8 w-[1px] bg-border-green"></div>
                    
                    {auth.user ? (
                        <Link href={route('profile.edit')} className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-surface-dark border-2 border-border-green flex items-center justify-center text-white font-bold">
                                {auth.user.name.charAt(0)}
                            </div>
                        </Link>
                    ) : (
                        <Link href={route('login')} className="text-sm font-bold text-white hover:text-primary">
                            Acceder
                        </Link>
                    )}
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-grow flex flex-col items-center">
                <div className="w-full max-w-[1200px] px-4 md:px-10 lg:px-20 py-5 flex flex-col gap-8">
                    
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                        <Link href="/" className="text-text-muted hover:text-primary font-medium transition-colors">Inicio</Link>
                        <span className="material-symbols-outlined text-text-muted text-sm">chevron_right</span>
                        <span className="text-white font-medium">Blog</span>
                    </div>

                    {/* HERO SECTION (Estática o destacada) */}
                    <div className="w-full relative rounded-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-black/40 z-0"></div>
                        <div className="relative min-h-[400px] flex flex-col justify-end p-6 md:p-12 z-20 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=2000')" }}>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-30 flex flex-col items-start gap-4">
                            <span className="bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Destacado</span>
                            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight max-w-3xl drop-shadow-lg">
                                Nueva Ley de Caza 2024: Lo que necesitas saber
                            </h1>
                            <p className="text-gray-200 text-base md:text-lg max-w-2xl drop-shadow-md mb-4">
                                Análisis completo de las nuevas normativas y cómo afectan a la temporada de este año.
                            </p>
                            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-background-dark font-bold py-3 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(73,236,19,0.3)]">
                                <span>Leer Artículo</span>
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    {/* BARRA DE BÚSQUEDA Y FILTROS */}
                    <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-surface-dark p-4 rounded-xl border border-border-green">
                        <div className="w-full lg:w-1/3 relative">
                            <label className="flex items-center h-12 w-full bg-background-dark rounded-lg border border-border-green focus-within:border-primary transition-colors overflow-hidden">
                                <div className="pl-3 pr-2 text-text-muted flex items-center justify-center">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input className="w-full bg-transparent border-none text-white placeholder:text-text-muted focus:ring-0 h-full text-base" placeholder="Buscar artículos..." />
                            </label>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full lg:w-2/3 lg:justify-end">
                            {categorias.map(cat => (
                                <Link 
                                    key={cat}
                                    href={route('blog.index', { categoria: cat })}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                        (filtros.categoria === cat || (!filtros.categoria && cat === 'Todos'))
                                        ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' 
                                        : 'bg-border-green hover:bg-[#3a5e30] text-gray-200 border border-transparent hover:border-primary/50'
                                    }`}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* GRID DE ARTÍCULOS */}
                    {posts.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            No hay artículos disponibles en esta categoría.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {posts.map(post => (
                                <article key={post.id} className="group bg-surface-dark rounded-xl overflow-hidden border border-border-green hover:border-primary/50 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(73,236,19,0.1)] hover:-translate-y-1 flex flex-col">
                                    <div className="relative h-48 overflow-hidden bg-black">
                                        <div 
                                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                                            style={{ backgroundImage: `url(${post.imagen_ruta ? '/storage/' + post.imagen_ruta : 'https://images.unsplash.com/photo-1445583934509-4ad5ff6ef955?q=80&w=1000'})` }}
                                        ></div>
                                        <div className="absolute top-3 left-3 bg-background-dark/80 backdrop-blur-sm px-2 py-1 rounded text-primary text-xs font-bold border border-primary/20 uppercase">
                                            {post.categoria}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-3 flex-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full mx-1"></span>
                                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                                            <span>{post.tiempo_lectura} min lectura</span>
                                        </div>
                                        <h3 className="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                            {post.titulo}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                            {post.resumen}
                                        </p>
                                        <div className="mt-auto pt-2">
                                            <span className="inline-flex items-center text-primary text-sm font-bold hover:underline cursor-pointer">
                                                Leer más <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                </div>
            </main>

            {/* FOOTER SIMPLE */}
            <footer className="bg-background-dark border-t border-border-green py-10 px-4 md:px-10 lg:px-40">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3 text-white">
                        <span className="material-symbols-outlined text-primary">forest</span>
                        <h3 className="text-lg font-bold">HunterLog</h3>
                    </div>
                    <p className="text-gray-500 text-sm">© 2024 HunterLog. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}