/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Verificar SI existe ruta o NO
const pathExists = (route) => fs.existsSync(route);
// Verifica si la ruta es ABSOLUTA
const pathIsAbsolute = (absoluteRoute) => path.isAbsolute(absoluteRoute);
// Convierte una ruta RELATIVA a ABSOLUTA
const turnPathAbsolute = (route) => (pathIsAbsolute(route) ? route : path.resolve(route));
// Busca si la extension de la ruta es MD
const isExtensionMd = (route) => path.extname(route) === '.md';
// Lee el archivo, Esta promesa del readFiles se ejecuta en cli
const readFiles = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

// Función para extraer los links
const getLinks = (route) => new Promise((resolve, reject) => {
  const links = [];
  readFiles(route)
    .then((data) => {
      const urlLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g;
      let match = urlLinks.exec(data);
      while (match !== null) {
        links.push({
          href: match[2],
          text: match[1],
          file: route,
        });
        match = urlLinks.exec(data);
      }
      (resolve(links));
    })
    .catch((error) => reject(error));
});
// getLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.html')
// .then((res) => console.log('este es de aqui', res));

// Función para validar links con axios
// const array = [
//   {
//     href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
//     text: 'description',
//     file: 'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
//   },
// ];

const getLinkStatus = (urls) => Promise.all(urls.map((link) => axios.get(link.href)
  .then((respuesta) => ({ ...link, status: respuesta.status, message: 'ok' }))
  // console.log(respuesta);

  .catch((error) => { // handle error
    let errorStatus;
    if (error.response) {
      // La respuesta fue hecha y el servidor respondió con un código de estado
      // que esta fuera del rango de 2xx
      errorStatus = error.response.status;
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      errorStatus = 500;
    } else {
      // Algo paso al preparar la petición que lanzo un Error
      errorStatus = 400;
    }
    // console.log('errorStatus', errorStatus);
    return { ...link, status: errorStatus, message: 'fail' };
  })));
// ({ ...link, status: error.response.status, message: 'Fail' }))));
  // console.log(error.response.status);
// getLinkStatus(array).then((resolve) => console.log((resolve)));

// Función para guardar los links en un array (practicando)
// const createArray = (route) => {
//   const mdArray = [];
//   if (isExtensionMd(route)) {
//     mdArray.push(route);
//   }
//   return mdArray;
// };

module.exports = {
  pathExists,
  pathIsAbsolute,
  turnPathAbsolute,
  isExtensionMd,
  readFiles,
  getLinks,
  getLinkStatus,
};
