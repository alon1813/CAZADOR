import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, jornadas }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Diario de Caza" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Mi Historial</h2>
                        <Link 
                            href={route('diario.create')} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Nueva Entrada
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {jornadas.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">No tienes jornadas registradas aún.</div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {jornadas.map((jornada) => (
                                    <li key={jornada.id} className="p-6 hover:bg-gray-50">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-lg font-bold text-gray-900">{jornada.ubicacion_texto}</p>
                                                <p className="text-sm text-gray-500">{new Date(jornada.fecha).toLocaleDateString()}</p>
                                                <p className="mt-2 text-gray-700">{jornada.comentarios}</p>
                                            </div>
                                            <div className="text-right text-xs text-gray-400">
                                                Lat: {jornada.latitud.toFixed(4)}<br/>
                                                Lon: {jornada.longitud.toFixed(4)}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}