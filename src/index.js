const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

//MongoDB:
const mongoose = require('mongoose');

const dbConnect = require('../config/connection.js');
dbConnect();
const Movie = require('../models/movies');
Movie();
const User = require('../models/users');
User();
const Actor = require('../models/actors');
Actor();


// CREAMOS LA CONFIGURACION DE SERVER:
const server = express();
server.use(cors());
//server.use(express.json());
server.use(express.json({ limit: '25mb' }));

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
  console.log(req.query)

  let myQuery = '';

  if (genreFilterParam === '' && sortFilterParam === 'asc') {
    myQuery = 'SELECT * FROM movies ORDER BY title ASC;';
  } else if (genreFilterParam === '' && sortFilterParam === 'desc') {
    myQuery = 'SELECT * FROM movies ORDER BY title DESC;';
  } else if (genreFilterParam !== '' && sortFilterParam === 'asc') {
    myQuery = 'SELECT * FROM movies WHERE genre = ? ORDER BY title ASC;';
  } else if (genreFilterParam !== '' && sortFilterParam === 'desc') {
    myQuery = 'SELECT * FROM movies WHERE genre = ? ORDER BY title DESC;';
  }
  // La interpolación de cadenas directamente en la consulta SQL presenta un riesgo de seguridad llamado SQL injection. Hay que utilizar parámetros de consulta preparados (?) para evitar este riesgo.

  connection
    .query(myQuery, [genreFilterParam])
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
});

server.post('/login', function (req, res) {
  connection
    .query('SELECT * FROM users WHERE email = ? AND password_ = ?;', [req.body.email, req.body.password])
    .then(([results, fields]) => {
      // Devolvemos el resultado de la query:
      console.log(results)
      if (results.length === 1) {
        res.json({
          success: true,
          userId: results[0].idUSer
        });
      } else {
        res.json({
          success: false,
          errorMessage: "Usuaria/o no encontrada/o"
        });
      }
    })
    // Si no ha ido bien la ejecución de la query, salta un error:
    .catch((err) => {
      throw err;
    });
});


// MongoDB:
server.get('/movies_all_mongo', function (req, res) {

  const query = Movie.find({}).then((docs) => {

    res.json({
      success: true,
      movies: docs,
    });
  });
})

/* server.get('/movies_all_mongo', (req, res) => {
  Movies.find({}, { title: 1, _id: 0 })
    .sort({ title: -1 })
    .then((doc) => {
      res.json({ 
        success: true, 
        movies: doc });
    })
    .catch((error) => {
      console.log('Error', error);
    });
}); */



/* server.get('/movies_filterGenre_mongo/:genreValue', (req, res) => {
  const { genreValue } = req.params;
  Movies.find({ genre: genreValue })
    .then((doc) => {
      res.json({ success: true, movies: doc });
    })
    .catch((error) => {
      console.log('Error', error);
    });
}); */




















/*
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
  console.log('hola caracola', sortFilterParam)


  if (sortFilterParam === 'desc') {
    console.log('sortfilterparam es desc')
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
} */





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