const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


// CREAMOS LA CONFIGURACION DE SERVER:
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

let connection;

// PREPARAMOS LA CONEXIÓN CON LA BD. Creamos la petición de conexión:
mysql
  .createConnection({
    host: '127.0.0.1',
    database: 'netflix',
    user: 'root',
    port: 3306,
  })
  // Si tiene "permiso" para conectar recibimos el objeto "conn" que usaremos para establecer la conexión:
  .then(conn => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log(`Conexión establecida con la base de datos (identificador=${connection.threadId})`);
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  // Si no tiene "permiso", dará un error: 
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });

//Definimos un endpoint (/movies) para poder utilizar con el método GET. Y así en el navegador cuando ponemos http://localhost:4000/movies se desencadena todo lo que programemos aquí:
server.get('/movies', function (req, res) {
  console.log('Pedimos a la base de datos que nos muestre las peliculas');
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;

  if (genreFilterParam === '') {

    connection
      .query('SELECT * FROM movies ORDER BY title ASC')
      .then(([results, fields]) => {
        // Devolvemos el resultado de la query:
        res.json({
          success: true,
          movies: results
        });
      })
      // Si no ha ido bien la ejecución de la query, salta un error:
      .catch((err) => {
        throw err;
      });


    if (sortFilterParam === 'desc') {
      connection
        .query('SELECT * FROM movies ORDER BY title DESC')
        .then(([results, fields]) => {
          // Devolvemos el resultado de la query:
          res.json({
            success: true,
            movies: results
          });
        })
        // Si no ha ido bien la ejecución de la query, salta un error:
        .catch((err) => {
          throw err;
        });
    }


  } else {
    connection
      // La interpolación de cadenas directamente en la consulta SQL presenta un riesgo de seguridad llamado SQL injection. Hay que utilizar parámetros de consulta preparados (?) para evitar este riesgo:
      .query('SELECT * FROM movies WHERE genre = ? ORDER BY title ASC', [genreFilterParam])
      .then(([results, fields]) => {
        // Devolvemos el resultado de la query con el requisito género:
        res.json({
          success: true,
          movies: results
        });
      })
      // Si no ha ido bien la ejecución de la query, salta un error:
      .catch((err) => {
        throw err;
      });
  }

  if (sortFilterParam === 'desc') {
    connection
      .query('SELECT * FROM movies WHERE genre = ? ORDER BY title DESC', [genreFilterParam])
      .then(([results, fields]) => {
        // Devolvemos el resultado de la query:
        res.json({
          success: true,
          movies: results
        });
      })
      // Si no ha ido bien la ejecución de la query, salta un error:
      .catch((err) => {
        throw err;
      });
  }


});


/* {
  success: true,
  movies: [
    {
      id: '1',
      title: 'Gambito de dama',
      genre: 'Drama',
      image:
        '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg'
    },
    {
      id: '2',
      title: 'Friends',
      genre: 'Comedia',
      image:
        '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg'
    }
  ]
} */