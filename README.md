# METEODAW - Sergi Formatjer

**No he podido terminarlo aún al completo**

Hice un fork del repo el primer día y empecé a desarrollar desde ahí.

Le añadí mis funcionalidades y, deje el proyecto parado para trabajar en las otras prácticas de clase.

Al retomarlo, en el original ya estaban implementadas todas las funciones (auth, favs, fotos y geoSearch)

Me creé un nuevo proyecto con un clon desde esta última versión e intente hacer merge de las dos versiones. No salió bien.

Así que desde mi versión inicial fuí añadiendo poco a poco las funcionalidades ya hechas.

No funcionan/faltan todas (fotos, favs a medias), pero al menos no se rompe y "medianamente" se puede usar.

Lo actualizaré y corregiré (1/2 dias max) estos errores pero a dia de entrega así es como está.

#### Para usar desde tu local aún no lo he probado pero no debería cambiarse demasiadas cosas.

- Cambiar la password para db en: favorites y login .php
- El script .sql es el mismo en los 2 repos.
- Ruta: http://localhost/WeatherApp/Frontend/Templates/

## Mis funcionalidades son:

- Vista horária de cada dia de la semana en esa ubicación en las cards (son scrolleables).
- Gráficos diários de la Temperatura, Viento y Precipitaciones\* con la libraría D3.js https://d3js.org/
- Dom Manipulation al hacer la busqueda de ubicación, llevar cada dato a su sitio.
- Top 3 results de Google de cada búsqueda.
- Artículo de cada búsqueda con Wikipedia API.
- Auth (SignIn, Login, Logout)
- favorites.
- Geolocation.

## TO DO:

- Añadir el gráfico de precipitación. Actualmente usa dirección del viento.
- Añadir correctamente los favorites y su búsqueda.
- Funcionalidad Upload Photos
- Width maximo = 100vw
- Dropdown select day funcionalidad
- Tooltip display none cuando !hoover
- Did you know UI
- Update readme.
