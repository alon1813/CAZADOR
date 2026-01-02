import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
// Librerías del Mapa
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// --- CONFIGURACIÓN DE ICONOS LEAFLET (Esto corrige un bug visual común en React) ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41] // Ajusta la punta del pin al sitio correcto
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- COMPONENTE AUXILIAR PARA CLIC EN EL MAPA ---
function SelectorDeUbicacion({ setPosicion }) {
    useMapEvents({
        click(e) {
            setPosicion(e.latlng); // Guardamos latitud y longitud al hacer clic
        },
    });
    return null;
}

export default function Crear({ auth }) {
    // Coordenadas iniciales (Centro de España aprox, o donde prefieras)
    const centroInicial = [40.416775, -3.703790]; 

    const { data, setData, post, processing, errors } = useForm({
        fecha: new Date().toISOString().split('T')[0], // Fecha de hoy
        ubicacion_texto: '',
        latitud: '',
        longitud: '',
        comentarios: '',
    });

    // Función para actualizar lat/long cuando el usuario pincha en el mapa
    const alSeleccionarPunto = (latlng) => {
        setData(previousData => ({
            ...previousData,
            latitud: latlng.lat,
            longitud: latlng.lng
        }));
    };

    const enviar = (e) => {
        e.preventDefault();
        post(route('diario.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Nueva Jornada" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6">Registrar Jornada de Caza</h2>
                        
                        <form onSubmit={enviar} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* --- COLUMNA IZQUIERDA: DATOS --- */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Fecha</label>
                                    <input 
                                        type="date" 
                                        className="border-gray-300 rounded-md shadow-sm w-full mt-1"
                                        value={data.fecha}
                                        onChange={e => setData('fecha', e.target.value)}
                                    />
                                    <span className="text-red-500 text-sm">{errors.fecha}</span>
                                </div>

                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Nombre del Lugar</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: Finca Los Olivares"
                                        className="border-gray-300 rounded-md shadow-sm w-full mt-1"
                                        value={data.ubicacion_texto}
                                        onChange={e => setData('ubicacion_texto', e.target.value)}
                                    />
                                    <span className="text-red-500 text-sm">{errors.ubicacion_texto}</span>
                                </div>

                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Comentarios / Notas</label>
                                    <textarea 
                                        className="border-gray-300 rounded-md shadow-sm w-full mt-1 h-32"
                                        value={data.comentarios}
                                        onChange={e => setData('comentarios', e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="p-4 bg-gray-50 rounded border">
                                    <p className="text-sm text-gray-600">Coordenadas seleccionadas:</p>
                                    <p className="font-mono font-bold">
                                        {data.latitud ? `${data.latitud.toFixed(6)}, ${data.longitud.toFixed(6)}` : 'Selecciona un punto en el mapa ->'}
                                    </p>
                                    <span className="text-red-500 text-sm">{errors.latitud}</span>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                                >
                                    Guardar Jornada
                                </button>
                            </div>

                            {/* --- COLUMNA DERECHA: MAPA --- */}
                            <div className="h-96 w-full border-2 border-gray-300 rounded-lg overflow-hidden">
                                <MapContainer center={centroInicial} zoom={6} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; OpenStreetMap contributors'
                                    />
                                    
                                    {/* Componente invisible que detecta clics */}
                                    <SelectorDeUbicacion setPosicion={alSeleccionarPunto} />

                                    {/* Si hay coordenadas seleccionadas, mostramos el marcador */}
                                    {data.latitud && (
                                        <Marker position={[data.latitud, data.longitud]} />
                                    )}
                                </MapContainer>
                                <p className="text-xs text-gray-500 mt-2 text-center">Haz clic en el mapa para marcar la ubicación exacta.</p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}