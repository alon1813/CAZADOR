<?php

namespace App\Mail;

use App\Models\Anuncio;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AvisoInteresado extends Mailable
{
    use Queueable, SerializesModels;

    public $anuncio;
    public $datosInteresado;

    /**
     * Crea una nueva instancia del mensaje.
     */
    public function __construct(Anuncio $anuncio, array $datosInteresado)
    {
        $this->anuncio = $anuncio;
        $this->datosInteresado = $datosInteresado;
    }

    /**
     * Asunto del correo.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '¡Alguien está interesado en tu anuncio: ' . $this->anuncio->titulo . '!',
        );
    }

    /**
     * Definición del contenido (usaremos una vista simple).
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.mercado.aviso_interesado',
        );
    }
}