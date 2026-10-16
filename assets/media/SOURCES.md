# Origen y optimización de imágenes

Este directorio contiene copias optimizadas para la web. Los originales históricos se conservan en `assets/img/` y `assets/sprint/`; las nuevas fotografías de Entre Físicos 2025 permanecen en el álbum de Drive facilitado por la organización. La conversión mantiene el encuadre completo, no añade elementos ni modifica el contenido artístico. Algunas páginas aplican `object-fit` o filtros de presentación mediante CSS.

## Imágenes de comunidad y encuentros

Estos originales ya estaban en [DerivateStem/Webpage](https://github.com/DerivateStem/Webpage) antes de la renovación. El repositorio no registra créditos fotográficos adicionales para estos archivos; su procedencia aquí se documenta mediante la ruta original.

| Copia | Original | Tratamiento |
| --- | --- | --- |
| `community.webp` | `assets/img/DerivateTeam.webp` | Ancho máximo 1600 px, WebP calidad 82. |
| `entre-fisicos.webp` | `assets/img/entre-físicos-2025.webp` | Ancho máximo 1600 px, WebP calidad 82. |
| `rifp.webp` | `assets/img/RIFP.webp` | Copia del WebP original: ya tenía 1080 × 608 px y menor peso que una nueva compresión. |
| `portada.webp` | `assets/img/portada.webp` | Ancho máximo 1800 px, WebP calidad 82. |

## Galería de Entre Físicos 2025

Selección del [álbum proporcionado por la organización](https://drive.google.com/drive/folders/1fyAdgt-WsClNvnOCoS-7NnvwmePJcT09), autorizado para la web el 16 de octubre de 2026. Su carpeta superior se titula `EF25`; no se atribuyen estas imágenes a otras ediciones ni se infieren nombres de las personas retratadas. No se dispone de créditos fotográficos confirmados.

Cada imagen tiene una copia para ampliación (`ef2025-*.webp`) y una miniatura (`ef2025-*-thumb.webp`). Se respetó la orientación y el encuadre completo: lado mayor máximo de 1800 y 720 px, respectivamente, sin ampliar, WebP calidad 82 y 78, generadas con Pillow y sin metadatos EXIF. Las miniaturas se presentan con `object-fit: cover`; el visor muestra la imagen completa con `contain`.

| Nombre base | Original en Drive | Subcarpeta | Referencia |
| --- | --- | --- | --- |
| `ef2025-grupo` | `DSC03949aa.jpg` | miercoles | [Original](https://drive.google.com/file/d/1GERzei7LSAjKVnijGChw8sS04Vgu8VE2/view) |
| `ef2025-charla` | `DSC05399aa.jpg` | jueves | [Original](https://drive.google.com/file/d/1CzJlk0yXstmstAvBrb442ey5SDJCgzqj/view) |
| `ef2025-demostracion` | `DSC04196aa.jpg` | lunes | [Original](https://drive.google.com/file/d/17yXFPdGy26BXZiEaus4uvAQoFSUB0Q73/view) |
| `ef2025-preguntas` | `DSC04738aa.jpg` | martes | [Original](https://drive.google.com/file/d/122P2jLkYkkS2xc5_lauXPxDfz6Cgw3cP/view) |
| `ef2025-libro` | `DSC03898aa.jpg` | lunes | [Original](https://drive.google.com/file/d/1TZ1zhT9TrxAb1GFBvxENl1NbEIWQToBq/view) |
| `ef2025-conversatorio` | `DSC06247aa.jpg` | viernes | [Original](https://drive.google.com/file/d/1dmKLxUkshJ5elxu98_0FO4pZxRHSp3El/view) |
| `ef2025-exposicion-martes` | `DSC04918aa.jpg` | martes | [Original](https://drive.google.com/file/d/1unHEB6oDF8F93gkYVvwUknHqXkYKhakt/view) |
| `ef2025-exposicion-miercoles` | `DSC05165aa.jpg` | miercoles | [Original](https://drive.google.com/file/d/10WuxYvYnl-3x51YPqr1h4577tkzzBpCK/view) |
| `ef2025-exposicion-viernes` | `DSC06116aa.jpg` | viernes | [Original](https://drive.google.com/file/d/1CF89cXysXFXDoxrHdjCx10g6VlTCcX18/view) |

Las nueve fotografías y sus miniaturas suman 1 186 872 bytes en dieciocho archivos; las nueve miniaturas suman 191 462 bytes. La ampliación de la selección incorpora tres intervenciones con micrófono del mismo álbum. Las imágenes grandes se solicitan al abrir el visor y las miniaturas usan carga diferida. Los JPEG originales no se incorporan al repositorio público.

## Galería de Research Sprint 2026

Seis fotografías de la sesión de pósteres tomadas del [álbum `sprint2026` proporcionado por la organización](https://drive.google.com/drive/folders/1oYer2tmZePcEWKhWXqNagy80TaCBJLHu) el 16 de octubre de 2026, para su incorporación a la web. Se muestran como recuerdos de la edición 2026, separados de la convocatoria 2027 y de los testimonios pendientes. No se infieren identidades ni créditos fotográficos.

| Nombre base | Original en Drive | Referencia |
| --- | --- | --- |
| `sprint2026-intercambio` | `DSC07060.jpg` | [Original](https://drive.google.com/file/d/1m7Zjk1Mh7palrWzwPB1UuHEGciNOeTc-/view) |
| `sprint2026-poster` | `DSC07075.jpg` | [Original](https://drive.google.com/file/d/1kAS0b6S5zzPbBdETzK8tuiiJ5ynhBPIy/view) |
| `sprint2026-conversacion` | `DSC07100.jpg` | [Original](https://drive.google.com/file/d/1SzI3jtgQQAZCOQZaiRPYPxWrCYTnFaM1/view) |
| `sprint2026-exposicion` | `DSC07114.jpg` | [Original](https://drive.google.com/file/d/1V5tZvWWepnAxtzMcccr79JcvdwMtJ7uV/view) |
| `sprint2026-presentacion` | `DSC07128.jpg` | [Original](https://drive.google.com/file/d/1Xn5k4KaS49LBcziGVEboQKOFzG9Y99vC/view) |
| `sprint2026-sesion` | `DSC07142.jpg` | [Original](https://drive.google.com/file/d/1kjo5vVci2Z2X9XydH1ia_T7DqtSaZKdK/view) |

Se aplican los mismos parámetros de Pillow de la galería anterior: copias de hasta 1800 px en WebP calidad 82 y miniaturas `-thumb` de hasta 720 px en calidad 78; orientación respetada, encuadre completo y sin EXIF. Los doce archivos pesan 1 283 334 bytes; las seis miniaturas suman 149 862 bytes. Los originales permanecen en Drive y no se incorporan al repositorio público.

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
