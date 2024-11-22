# Nitsnets Prueba Técnica

## Instalación

Es necesario tener instalado Node.js almenos en la versión 18 para adelante. En el caso de usar alguna versión que no sean en las versiones 18.12, 20.9 o 22.0 en adelante, es posible que aparezcan warnings al instalar alguna de las dependencias que usa Nuxt, pero en principio no debería haber problemas.

En su defecto, he creado también un docker-compose y un dockerfile para poder correr la aplicación en un contenedor de Docker.

A continuación se muestra cómo ejecutar el proyecto en ambos casos. Se puede utilizar el que se prefiera.

## Ejecutar en local

1. Clonar el repositorio
2. Instalar las dependencias. Yo he usado `npm` pero se puede usar el gestor de paquetes que se prefiera.

```bash
npm install
```

3. Ejecutar el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

## Ejecutar con Docker

Será necesario tener instalado Docker anteriormente.

1. Clonar el repositorio.
2. Ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

3. La web estará disponible en `http://localhost:3000` con hot reload por si fuese necesario.

## Mock Server

El Mock Server se ha hecho con Postman. La URL es la siguiente: [https://201cf1a4-928b-421c-9baa-fd62d66a6adc.mock.pstmn.io](https://201cf1a4-928b-421c-9baa-fd62d66a6adc.mock.pstmn.io), y aquí se puede ver la [documentación de la API](https://documenter.getpostman.com/view/39917601/2sAYBSkYh3).

Postman tiene un limite de 1000 peticiones mensuales. Es de las mejores opciones gratuitas que he encontrado así que he creado una cuenta nueva para que haya bastante margen hasta llegar al límite. Si se llegase al límite contactarme y intento solucionarlo.

## Dependencias utilizadas

- **Framework de Vue**: [Nuxt](https://nuxt.com/)
- **Framework Javascript**: [Vue.js](https://vuejs.org/)
- **Librería de componentes**: [Vuetify](https://vuetifyjs.com/en/)
- **Gestión del estado**: [Pinia](https://pinia.vuejs.org/)
- **Librería de drag & drop**: [Vuedraggable](https://www.npmjs.com/package/vuedraggable)
- **Linter**: [ESLint](https://eslint.org/)
- **Formateador de código**: [Prettier](https://prettier.io/)

## Notas

Se ha utilizado el linter ESLint junto con Prettier y SonarLint para mantener un código limpio y ordenado. Además, se ha intentado seguir el patrón de diseño de Vue.js y Vuetify para mantener una coherencia en el código.

Para el estado global de la aplicación se ha usado Pinia, que es una librería que se integra muy bien con Vue.js y que permite tener un estado global de manera muy sencilla.

Por último para el drag & drop de los productos se ha usado Vuedraggable, que es una librería muy sencilla de usar y que se integra muy bien con Vue.js.
