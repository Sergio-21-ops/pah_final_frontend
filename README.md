# Music API

Este sitio tiene como fin cargar y mostrar informacion sobre ciertos objetos relacionados al mundo musical
En este repositorio encontraran el codigo distribuido en distintos bloques correspondiente al frontend a ejecutar.


## Vistas del sitio 

* Usuario
* Disco
* Banda
* Artista

### Funcionalidades requeridas

**Usuarios**

* Agregar uno por la vista de Registro ingresando y validando sus datos.
<pre><code>
{
        "nombre": "Jose",
        "apellido": "Gonzalez",
        "nombre_usuario": "jose1236",
        "email": "jose@gonza.com",
        "password": "12345"
    }

</code></pre>

* Ingresar en la vista de Login ingresando el email y la contraseña con la que se registro para ver TODAS las pestañas relacionadas al sitio.

<pre><code>
      {
        "email": "jose@gonza.com",
        "password": "12345"
    }
</code></pre>

**Discos**
* En esta vista se visualizan todos los discos precargados y cargados por los usuarios .
* Agregar un disco ingresando y validando sus datos por el formulario mediante el boton de agregar disco. 

___Es importante aclarar que si el usuario quiere agregar un disco pero no se encuentra su banda primero debe cargar los datos de la banda en la vista de bandas y luego aparecera en el menu de agregar disco el select con las ya estan cargadas y seleccionar la correspondiente .___ 

<pre><code>{
    "nombre": "Nuevo Disco",
    "ano": 2021,
    "genero": "rock",
    "banda": *seleccionar en el menu desplegable la banda seleccionada *  
}

</code></pre>

* Seleccionar en el boton ver detalle para visualizar un disco y ver toda su informacion .
* Seleccionar el boton actualizar disco para cambiar la información de un dato o TODOS en particular .
* Eliminar uno mediante el boton eliminar .
* Filtrarlo por su nombre en orden alfabetico ascendente o viceversa .
* Buscar un disco por su nombre y que apareca en la busqueda .

**Bandas**

* Agregar banda ingresando y validando sus datos correspondientes.

<pre><code>
{
  "nombre": "Malon",
  "ano_fundacion": 1995,
  "biografia": "Es una banda de heavy metal argentino"
}

</code></pre>


* Ver todos las bandas de su colección.

---


**Artistas**


* Agregar un artista ingresando y validando sus datos por la vista Artistas.

<pre><code>{
  "nombre": "Antonio",
  "apellido": "Romano",
  "mini_biografia": "Guitarrista de Hermetica y Malon.",
  "edad": 64,
  "instrumentos": ["Guitarra"]
}
</code></pre>

* Ver todos los artistas de su colección.


## Lenguaje utilizado
* Html 5
* CSS
* SCSS
* JS
* JSON

## Herramientas y librerias utilizadas
* NodeJS 
* Express
* Mongoose
* Path
* Dotenv
* fileURLToPath

### Dependencias utilizadas
* axios 
* js-cookie
* jwt-decode
* react
* react-dom
* react-router-dom


## Archivos de renombre

* App.jsx
* AuthContexto.jsx
* Main.jsx
* Discos.jsx
* Bandas.jsx
* Registro.jsx
* Login.jsx
* FormInput.jsx
* FormInput.css
* Modal.jsx
* Modal.css
---


### Mis datos del proyecto

- Nombre : Sergio
- Apellido : Diaz
- Materia: Aplicaciones hibridas 
- Profesora: Camila Belen
- [Mi perfil en github](https://github.com/Sergio-21-ops?tab=repositories)