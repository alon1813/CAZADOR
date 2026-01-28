<x-mail::message>
# ¡Hola {{ $anuncio->usuario->name }}!

Tienes un nuevo interesado en tu artículo **{{ $anuncio->titulo }}**.

---

### Datos del Interesado:
* **Nombre:** {{ $datosInteresado['nombre'] }}
* **Email:** {{ $datosInteresado['email'] }}
* **Mensaje:**
> "{{ $datosInteresado['mensaje'] }}"

---

Puedes ponerte en contacto respondiendo a este correo.

Atentamente,<br>
El equipo de **HunterLog**
</x-mail::message>