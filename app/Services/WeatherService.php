<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    /**
     * Obtiene el clima actual para unas coordenadas.
     */
    public function getWeatherData($lat, $lon)
    {
        if (!$this->apiKey) {
            return null; // Si no hay API key configurada, no hacemos nada
        }

        try {
            $response = Http::get($this->baseUrl, [
                'lat' => $lat,
                'lon' => $lon,
                'appid' => $this->apiKey,
                'units' => 'metric', // Para obtener grados Celsius
                'lang' => 'es'       // Descripción en español
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                // Devolvemos solo lo que nos interesa guardar
                return [
                    'temp' => round($data['main']['temp']),
                    'descripcion' => ucfirst($data['weather'][0]['description']),
                    'icono' => $data['weather'][0]['icon'], // Código del icono (ej: 10d)
                    'humedad' => $data['main']['humidity'],
                    'viento' => $data['wind']['speed'],
                ];
            }
            
            return null;

        } catch (\Exception $e) {
            // Si falla (sin internet, api caída), no rompemos la app, solo logueamos
            Log::error("Error obteniendo clima: " . $e->getMessage());
            return null;
        }
    }
}