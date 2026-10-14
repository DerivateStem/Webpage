# Origen y optimización de imágenes

Este directorio contiene copias optimizadas para la web. Los archivos originales se conservan en `assets/img/` y `assets/sprint/`. La conversión mantiene el encuadre completo, no añade elementos ni modifica el contenido artístico. Algunas páginas aplican `object-fit` o filtros de presentación mediante CSS.

## Imágenes de comunidad y encuentros

Estos originales ya estaban en [DerivateStem/Webpage](https://github.com/DerivateStem/Webpage) antes de la renovación. El repositorio no registra créditos fotográficos adicionales para estos archivos; su procedencia aquí se documenta mediante la ruta original.

| Copia | Original | Tratamiento |
| --- | --- | --- |
| `community.webp` | `assets/img/DerivateTeam.webp` | Ancho máximo 1600 px, WebP calidad 82. |
| `entre-fisicos.webp` | `assets/img/entre-físicos-2025.webp` | Ancho máximo 1600 px, WebP calidad 82. |
| `rifp.webp` | `assets/img/RIFP.webp` | Copia del WebP original: ya tenía 1080 × 608 px y menor peso que una nueva compresión. |
| `portada.webp` | `assets/img/portada.webp` | Ancho máximo 1800 px, WebP calidad 82. |

## Recursos de Summer Sprint

Las imágenes base de `assets/sprint/` se incorporaron desde la referencia [DERIVATE 2026 en Figma](https://www.figma.com/design/rT5DxMSxg7FqszLNDQTsQ1/DERIVATE-2026), piezas [250:136](https://www.figma.com/design/rT5DxMSxg7FqszLNDQTsQ1/DERIVATE-2026?node-id=250-136) y [250:137](https://www.figma.com/design/rT5DxMSxg7FqszLNDQTsQ1/DERIVATE-2026?node-id=250-137), proporcionadas para esta actualización. No se atribuye una autoría fotográfica ni una licencia externa que no figure en los archivos disponibles.

| Copia | Original | Tratamiento |
| --- | --- | --- |
| `architecture.webp` | `assets/sprint/architecture.png` | Lado mayor máximo 1600 px; resultado 900 × 1600 px. |
| `earth.webp` | `assets/sprint/earth.png` | Ancho máximo 900 px, sin ampliar; resultado 700 × 525 px. |
| `quantum.webp` | `assets/sprint/quantum.png` | Ancho máximo 900 px. |
| `theory.webp` | `assets/sprint/theory.png` | Ancho máximo 900 px. |
| `neural.webp` | `assets/sprint/neural.png` | Ancho máximo 900 px. |
| `seismic.webp` | `assets/sprint/seismic.png` | Ancho máximo 900 px. |
| `deep.webp` | `assets/sprint/deep.png` | Ancho máximo 900 px. |

Todas estas copias usan WebP calidad 82. Las imágenes de proyectos son recursos visuales de la convocatoria; no se presentan como resultados producidos por los proyectos.

## Fotos de equipo y ponentes

Las copias de `profiles/` derivan de las fotos históricas del repositorio. Se generaron con lado mayor máximo 600 px, sin ampliación, conservando la proporción y el encuadre, en WebP calidad 82. Los nombres siguientes identifican archivos de origen, no incorporan datos nuevos sobre las personas retratadas.

| Copia en `profiles/` | Original |
| --- | --- |
| `foto-leo.webp` | `assets/img/foto-leo.jpg` |
| `mariano-effio.webp` | `assets/img/mariano-effio.jpg` |
| `daniel-navarro.webp` | `assets/img/daniel-navarro.jpg` |
| `juan-diego.webp` | `assets/img/juan-diego.jpg` |
| `gretta-foto-derivate.webp` | `assets/img/gretta-foto-derivate.jpg` |
| `adrian-equipo.webp` | `assets/img/adrian-equipo.jpg` |
| `diego-haro.webp` | `assets/img/diego-haro.jpg` |
| `hipolito.webp` | `assets/img/hipolito.jpg` |
| `enrique.webp` | `assets/img/enrique.jpg` |
| `david-cespedes-1.webp` | `assets/img/David Cespedes 1.jpg` |
| `fernando-temoche.webp` | `assets/img/entre-fisicos/Fernando_temoche.jpg` y `assets/img/Fernando Temoche 1.jpg`, originales idénticos. |
| `adrian-diaz.webp` | `assets/img/entre-fisicos/Adrian_diaz.jpg` |
| `renzo-franco.webp` | `assets/img/entre-fisicos/renzo_franco.jpg` |
| `david-hinostroza.webp` | `assets/img/entre-fisicos/david_hinostroza.jpg` |
| `lizhet-gonzales.webp` | `assets/img/entre-fisicos/Lizhet_gonzales.jpg` |
| `lucia-coll.webp` | `assets/img/entre-fisicos/lucia_coll.jpg` |
| `mario-solis.webp` | `assets/img/Mario Solis.jpg` |
| `andres-argandona-1.webp` | `assets/img/Andres Argandoña 1.jpg` |

## Parámetros de generación

Las copias se generaron con Sharp: ajuste proporcional `fit: 'inside'`, `withoutEnlargement: true`, WebP `quality: 82` y `effort: 6`. Se respetó la orientación de las fotos. El conjunto inicial de 11 imágenes pesa 677 054 bytes; las 18 fotos optimizadas de `profiles/` pesan 573 690 bytes, frente a 10 813 530 bytes de sus originales únicos, una reducción del 94,69 %. Estas cifras corresponden a los archivos de esta renovación y deben recalcularse si se sustituyen.
