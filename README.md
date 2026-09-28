# SIRIUS — Premium Contrast Edition

Versión de alto contraste de la web SIRIUS.

## Dirección visual
- Hero negro cinematográfico.
- Logo exacto enviado por el equipo dentro de superficies blancas/3D.
- Wordmark SIRIUS en fuente Antonio.
- Secciones claramente diferenciadas por color y material:
  - negro profundo,
  - blanco editorial,
  - gris cálido,
  - metal/vidrio,
  - azul nocturno,
  - crema.
- Profundidad mediante glassmorphism, halos, órbitas, sombras, superficies metálicas y objetos flotantes.

## Animaciones incluidas
- Preloader.
- Entrada letra por letra del wordmark SIRIUS.
- Scroll progress.
- Reveal on scroll.
- Spotlight que sigue el cursor por sección.
- Tilt 3D en logo, integrantes, ecosistema y casos.
- Botones magnéticos.
- Cursor glow.
- Parallax del hero y elementos decorativos.
- Marquee infinito.
- Órbitas pulsantes.
- Objetos flotantes y rotación.
- Grid perspectivo en hero.
- Hover con barrido de luz en servicios.

## Logo
El archivo usado es:
`assets/sirius-logo.png`

Es el mismo archivo de imagen proporcionado por el usuario. No se reemplazó por un SVG reinterpretado.

## Fuente SIRIUS
Se utiliza Antonio mediante Google Fonts:

```css
font-family: Antonio, sans-serif;
```

## Editar WhatsApp
En `index.html` busca:

```html
data-phone="573000000000"
```

Reemplázalo por el número real, sin `+`, espacios ni guiones.

## Fotos del equipo
Coloca las imágenes dentro de `assets/` y cambia cada placeholder por:

```html
<div class="portrait-placeholder">
  <img src="assets/nombre.jpg" alt="Nombre del integrante">
</div>
```

Luego agrega:

```css
.portrait-placeholder img{
  width:100%;
  height:100%;
  object-fit:cover;
}
```

## Abrir
Abre `index.html` directamente o usa Live Server.

No requiere compilación.


## Ajuste del logo (v2)
El archivo original enviado se conserva intacto como `assets/sirius-logo-original.png`.
Para integrarlo visualmente sin que se perciba como una imagen cuadrada, se derivó `assets/sirius-star-transparent.png` eliminando únicamente el fondo blanco y conservando la silueta exacta del símbolo. Esta versión se usa como máscara y elemento gráfico 3D.

## Ajuste del hero (v2)
El subtítulo principal se redujo en tamaño y ancho para dar más aire al wordmark SIRIUS y al símbolo 3D.


## Actualización de equipo
Se agregaron las fotos reales de Danna, Valentina, Samuel y María José. El WhatsApp configurado es +57 312 452 1336.
