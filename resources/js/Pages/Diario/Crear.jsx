import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
// --- Librerías de Mapa ---
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuración de iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente para detectar clics en el mapa
function SelectorDeUbicacion({ setPosicion }) {
    useMapEvents({
        click(e) { setPosicion(e.latlng); },
    });
    return null;
}

export default function Crear({ auth, misArmas }) { // <--- Asumo que pasaremos 'misArmas' desde el controlador luego
    
    // --- Estado del Formulario ---
    const { data, setData, post, processing, errors } = useForm({
        fecha: new Date().toISOString().split('T')[0],
        ubicacion_texto: '',
        latitud: '',
        longitud: '',
        comentarios: '',
        imagen: null,
        arma_id: '',
        // Inicializamos con una captura vacía
        capturas: [{ especie: 'Jabalí', cantidad: 1, peso: '' }]
    });

    // --- Lógica del Mapa ---
    const centroInicial = [40.416775, -3.703790]; // Madrid (o tu zona por defecto)
    
    const alSeleccionarPunto = (latlng) => {
        setData(prev => ({ ...prev, latitud: latlng.lat, longitud: latlng.lng }));
    };

    // --- Lógica de la Tabla de Capturas ---
    const addCaptura = () => {
        setData('capturas', [...data.capturas, { especie: 'Jabalí', cantidad: 1, peso: '' }]);
    };

    const removeCaptura = (index) => {
        const nuevas = [...data.capturas];
        nuevas.splice(index, 1);
        setData('capturas', nuevas);
    };

    const updateCaptura = (index, field, value) => {
        const nuevas = [...data.capturas];
        nuevas[index][field] = value;
        setData('capturas', nuevas);
    };

    // --- Envío ---
    const enviar = (e) => {
        e.preventDefault();
        post(route('diario.store'));
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white selection:bg-primary selection:text-black">
            <Head title="Nueva Jornada" />

            {/* --- HEADER --- */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-green bg-background-dark/95 backdrop-blur-sm px-6 py-3 lg:px-10">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary">
                        <span className="material-symbols-outlined text-[32px]">verified_user</span>
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight">HunterLog</h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href={route('armeria.index')} className="text-text-muted hover:text-primary transition-colors text-sm font-medium">Mi Armero</Link>
                    <Link href={route('diario.index')} className="text-white text-sm font-bold border-b-2 border-primary">Mis Jornadas</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-surface-dark border-2 border-border-green flex items-center justify-center text-white font-bold">
                        {auth.user.name.charAt(0)}
                    </div>
                </div>
            </header>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <div className="flex flex-1 justify-center py-8 px-4 md:px-8 lg:px-40">
                <div className="flex flex-col max-w-[1200px] flex-1 gap-8">
                    
                    {/* Título de Página */}
                    <div className="flex flex-wrap justify-between items-end gap-4 border-b border-border-green pb-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-text-muted text-sm font-medium">
                                <span>Diario</span>
                                <span className="material-symbols-outlined text-xs">chevron_right</span>
                                <span className="text-white">Nueva Entrada</span>
                            </div>
                            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight">Registrar Jornada</h1>
                            <p className="text-text-muted text-base">Completa los detalles de tu última salida al campo.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={route('diario.index')} className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-border-green bg-surface-dark hover:bg-white/5 text-white text-sm font-bold transition-colors">
                                Cancelar
                            </Link>
                            <button onClick={enviar} disabled={processing} className="flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary hover:bg-primary-dark text-background-dark text-sm font-bold transition-colors shadow-[0_0_15px_rgba(73,236,19,0.3)]">
                                <span className="material-symbols-outlined text-lg">save</span>
                                Guardar Jornada
                            </button>
                        </div>
                    </div>

                    <form onSubmit={enviar} className="flex flex-col gap-8">
                        
                        {/* --- SECCIÓN 1: DATOS Y MAPA --- */}
                        <div className="bg-surface-dark rounded-xl border border-border-green p-6 shadow-sm">
                            <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">feed</span>
                                Datos Generales
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Columna Izquierda: Inputs */}
                                <div className="flex flex-col gap-6">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-white text-sm font-medium">Fecha</span>
                                        <input 
                                            type="date" 
                                            className="w-full h-12 rounded-lg bg-background-dark border border-border-green text-white px-4 focus:border-primary focus:ring-primary"
                                            value={data.fecha}
                                            onChange={e => setData('fecha', e.target.value)}
                                        />
                                        <span className="text-red-500 text-xs">{errors.fecha}</span>
                                    </label>

                                    <label className="flex flex-col gap-2">
                                        <span className="text-white text-sm font-medium">Ubicación (Nombre)</span>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                className="w-full h-12 rounded-lg bg-background-dark border border-border-green text-white pl-4 pr-10 focus:border-primary focus:ring-primary placeholder:text-text-muted" 
                                                placeholder="Ej: Finca Los Alcornocales..." 
                                                value={data.ubicacion_texto}
                                                onChange={e => setData('ubicacion_texto', e.target.value)}
                                            />
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">my_location</span>
                                        </div>
                                        <span className="text-red-500 text-xs">{errors.ubicacion_texto}</span>
                                    </label>

                                    {/* Widget Clima (Estático por ahora, conectaremos API después) */}
                                    <div className="flex flex-col gap-2">
                                        <span className="text-white text-sm font-medium">Clima (Simulación)</span>
                                        <div className="flex items-center gap-4 p-4 rounded-lg bg-background-dark/50 border border-border-green border-dashed">
                                            <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-yellow-400">
                                                <span className="material-symbols-outlined text-2xl">partly_cloudy_day</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-lg">--°C • --</span>
                                                <span className="text-text-muted text-sm">Se actualizará al guardar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Columna Derecha: Mapa Real Leaflet */}
                                <div className="flex flex-col gap-2 h-full min-h-[300px]">
                                    <span className="text-white text-sm font-medium">Seleccionar Punto Exacto</span>
                                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border-green group z-0">
                                        <MapContainer center={centroInicial} zoom={6} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; OpenStreetMap contributors'
                                            />
                                            <SelectorDeUbicacion setPosicion={alSeleccionarPunto} />
                                            {data.latitud && <Marker position={[data.latitud, data.longitud]} />}
                                        </MapContainer>
                                        
                                        {!data.latitud && (
                                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs z-[1000] pointer-events-none">
                                                Haz clic en el mapa
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs text-text-muted text-right">
                                        GPS: {data.latitud ? `${data.latitud.toFixed(5)}, ${data.longitud.toFixed(5)}` : 'Pendiente...'}
                                    </div>
                                    <span className="text-red-500 text-xs">{errors.latitud}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- SECCIÓN 2: CAPTURAS (Dinámica) --- */}
                        <div className="bg-surface-dark rounded-xl border border-border-green p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">pest_control</span>
                                    Capturas
                                </h3>
                                <button type="button" onClick={addCaptura} className="text-primary hover:text-white text-sm font-bold flex items-center gap-1 transition-colors">
                                    <span className="material-symbols-outlined text-lg">add_circle</span>
                                    Añadir Especie
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* Cabecera Tabla Desktop */}
                                <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-2 border-b border-border-green text-text-muted text-xs uppercase tracking-wider font-semibold">
                                    <div className="col-span-5">Especie</div>
                                    <div className="col-span-3">Nº Piezas</div>
                                    <div className="col-span-3">Peso aprox. (kg)</div>
                                    <div className="col-span-1 text-center">Acciones</div>
                                </div>

                                {/* Filas Dinámicas */}
                                {data.capturas.map((item, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-background-dark p-4 rounded-lg border border-border-green hover:border-primary/30 transition-colors">
                                        <div className="col-span-12 md:col-span-5">
                                            <label className="md:hidden text-text-muted text-xs mb-1 block">Especie</label>
                                            <select 
                                                className="w-full h-10 rounded bg-surface-dark border-border-green text-white text-sm focus:border-primary focus:ring-0"
                                                value={item.especie}
                                                onChange={(e) => updateCaptura(index, 'especie', e.target.value)}
                                            >
                                                <option>Jabalí</option>
                                                <option>Ciervo</option>
                                                <option>Corzo</option>
                                                <option>Perdiz</option>
                                                <option>Conejo</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 md:col-span-3">
                                            <label className="md:hidden text-text-muted text-xs mb-1 block">Piezas</label>
                                            <input 
                                                type="number" 
                                                className="w-full h-10 rounded bg-surface-dark border-border-green text-white text-center text-sm focus:border-primary focus:ring-0"
                                                value={item.cantidad}
                                                onChange={(e) => updateCaptura(index, 'cantidad', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-6 md:col-span-3">
                                            <label className="md:hidden text-text-muted text-xs mb-1 block">Peso Total</label>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    className="w-full h-10 rounded bg-surface-dark border-border-green text-white text-sm pr-8 focus:border-primary focus:ring-0"
                                                    value={item.peso}
                                                    onChange={(e) => updateCaptura(index, 'peso', e.target.value)}
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">kg</span>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-1 flex justify-center">
                                            <button type="button" onClick={() => removeCaptura(index)} className="text-text-muted hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10">
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- SECCIÓN 3: DETALLES Y FOTO --- */}
                        <div className="bg-surface-dark rounded-xl border border-border-green p-6 shadow-sm mb-12">
                            <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary">description</span>
                                Detalles Adicionales
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-6">
                                    <label className="flex flex-col gap-2 h-full">
                                        <span className="text-white text-sm font-medium">Observaciones</span>
                                        <textarea 
                                            className="w-full flex-1 min-h-[140px] rounded-lg bg-background-dark border border-border-green text-white p-4 focus:border-primary focus:ring-primary placeholder:text-text-muted resize-none" 
                                            placeholder="Detalles sobre el terreno, avistamientos, etc..."
                                            value={data.comentarios}
                                            onChange={e => setData('comentarios', e.target.value)}
                                        ></textarea>
                                    </label>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-white text-sm font-medium">Foto de la Jornada</span>
                                    <label className="flex-1 min-h-[220px] w-full rounded-lg border-2 border-dashed border-border-green bg-background-dark hover:bg-background-dark/80 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center group relative overflow-hidden">
                                        
                                        {data.imagen ? (
                                            <>
                                                <p className="text-primary font-bold z-10">Imagen Seleccionada</p>
                                                <p className="text-xs text-gray-400 z-10">{data.imagen.name}</p>
                                                <div className="absolute inset-0 bg-primary/10"></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="size-12 rounded-full bg-surface-dark flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                    <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                                                </div>
                                                <p className="text-white font-medium text-sm">Haz clic para subir foto</p>
                                            </>
                                        )}
                                        
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            onChange={e => setData('imagen', e.target.files[0])}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}