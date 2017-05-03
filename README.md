## Dependencias

- NodeJS `>=4.8.1 || >=6.9.5`
- Yarn (https://yarnpkg.com/)

Antes de continuar hay que instalar todas las dependencias,

```
# activa nodejs
$ nvm use 4
$ yarn
```

### Objetivo

Realizar diversas preguntas al usuario relacionadas con las imágenes seleccionadas.

Por ejemplo, "¿Esta imagen corresponde a Eptesicus brasiliensis?" se puede
responder con varias opciones: sí, no, no lo sé.

> Las preguntas están definidas en el programa, sin embargo sería ideal poder
> definirlas de manera externa, de esta forma una sola imagen podría ayudar a
> resolver diferentes preguntas.

### Resultados

El sistema persiste las respuestas de todas las sesiones en la aplicación,
de este modo podemos obtener ya sea un promedio o total de cada
respuesta dada.

Por ejemplo:

```
GET /stats/57843f80016e730f14d3f672_b875be1b982bb6bb70bc3656291d172e

# resultados de una sola imagen
{
  "status: "ok",
  "result": {
    "likes": 123,
    "dislikes": 67,
    "avgQuality": 4.3,
    "totalAnswers": 200,
  }
}

GET /stats

# resultados de todas las imágenes
{
  "status": "ok",
  "result": [
    { ... }
  ]
}
```


### ¿Cómo crear la base datos?

Inicia la consola interactiva con `yarn repl` y ejecuta `.sync`
para crear la base de datos y los modelos necesarios.

> Se mostrará un mensaje "All models synced" si el resultado fue exitoso.

Guarda todos los archivos JSON e imágenes en la carpeta pública de la aplicación,
de esta forma serán accesibles por la interfaz web.

Ejemplo:

```
public/data/
├── 57843f80016e730f14d3f672_b875be1b982bb6bb70bc3656291d172e.png
└── 57843f80016e730f14d3f672_b875be1b982bb6bb70bc3656291d172e.json
```

Una vez copiados los archivos ya se pueden crear referencias en la base de datos:

```
$ yarn load
```

### ¿Cómo desarrollar/iniciar el sistema?

El sistema consiste en dos aplicaciones: una para front-end y otra back-end:

```
# back-end (desarrollo/producción)
$ yarn start

# front-end (desarrollo)
$ yarn dev
```

> El front-end debe compilarse antes de salir a producción con `yarn build`,
> los archivos generados se copiarán a la carpeta pública de la aplicación. Es decir,
> en modo productivo no es necesario arrancar el servidor de desarrollo para front-end.

Opcionalmente puedes iniciar de forma rápida ambos servicios para desarrollo con `yarn dev:reload`.
