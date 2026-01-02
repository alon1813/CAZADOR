import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, misArmas }) {
    // Hook de Inertia para manejar formularios
    const { data, setData, post, processing, reset, errors } = useForm({
        nombre: '',
        tipo: 'Rifle', // Valor por defecto
        calibre: '',
        notas: '',
    });

    const enviarFormulario = (e) => {
        e.preventDefault();
        // Enviamos la petición POST a la ruta que definimos en Laravel
        post(route('armeria.store'), {
            onSuccess: () => reset(), // Si sale bien, limpia el formulario
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mi Armería Digital</h2>}
        >
            <Head title="Armería" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* --- FORMULARIO DE NUEVA ARMA --- */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Registrar Nueva Arma</h2>
                            <p className="mt-1 text-sm text-gray-600">Añade rifles, escopetas o arcos a tu inventario.</p>
                        </header>

                        <form onSubmit={enviarFormulario} className="mt-6 space-y-6 max-w-xl">
                            {/* Nombre */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Nombre / Modelo</label>
                                <input 
                                    type="text" 
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                />
                                <span className="text-red-600 text-sm">{errors.nombre}</span>
                            </div>

                            {/* Tipo */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Tipo</label>
                                <select 
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.tipo}
                                    onChange={e => setData('tipo', e.target.value)}
                                >
                                    <option value="Rifle">Rifle</option>
                                    <option value="Escopeta">Escopeta</option>
                                    <option value="Arco">Arco</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            {/* Calibre */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Calibre</label>
                                <input 
                                    type="text" 
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.calibre}
                                    onChange={e => setData('calibre', e.target.value)}
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Guardar Arma
                            </button>
                        </form>
                    </div>

                    {/* --- LISTADO DE ARMAS --- */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Mis Armas Registradas</h3>
                        
                        {misArmas.length === 0 ? (
                            <p className="text-gray-500">Aún no has registrado ningún arma.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {misArmas.map((arma) => (
                                    <div key={arma.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                                        <h4 className="font-bold text-lg">{arma.nombre}</h4>
                                        <p className="text-sm text-gray-600">Tipo: {arma.tipo}</p>
                                        <p className="text-sm text-gray-600">Calibre: {arma.calibre || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}