/* eslint-disable no-undef */
require('axios');
const { mdLinks } = require('../index');

const absolutePathMd = 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md';
const array = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
  {
    href: 'https://developers.google.com/v8/',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    text: 'motor de JavaScript V8 de Chrome',
  },
  {
    href: 'https://nodejs.org/',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    text: 'Node.js',
  },
];
const arrayGetStatus = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 200,
    message: 'ok',
  },
];
// ----------------------------TESTS DE MDLINKS/INDEX.JS-------------------------------------------
// Test de cuando NO existe la ruta
describe('mdLinks', () => {
  // it("should test async errors", async () => {
  //   await expect(failingAsyncTest()).rejects.toThrow("I should fail");
  // });
  // test("the fetch fails with an error", () => {
  //   return expect(fetchData()).rejects.toMatch("error");
  // });
  //  it("Debe rechazar cuando el path no exixte", () =>
  //    mdLinks(
  //      "C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/noexiste.md"
  //    ).catch((error) => {
  //      expect(error).toStrictEqual(new Error("Path does not exist"));
  //    }));
  it('Debe rechazar cuando el path no exixte', () => expect(mdLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/noexiste.md'))
    .rejects.toThrowError(new Error('Path does not exist')));
  it('Debe rechazar si el archivo no es ext .md', () => mdLinks('./prueba/ejemplo.html').catch((error) => {
    expect(error).toStrictEqual(new Error('Path is not an extension file .md'));
  }));
  // it('Debe ser True si el path es extension md', () => mdLinks(absolutePathMd)
  // .then((resolve) => expect(resolve).toBe('true')));

  it('Debe rechazar si el archivo no es ext .md', () => mdLinks('./prueba/ejemplo.html').catch((error) => {
    expect(error).toStrictEqual(new Error('Path is not an extension file .md'));
  }));
  it('Debe MOSTRAR los LINKS', () => mdLinks(absolutePathMd)
    .then((resolve) => expect(resolve).toStrictEqual(arrayGetStatus)));
  it('Debe rechazar cuando no tiene links', () => expect(mdLinks('C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplosinLinks.md'))
    .rejects.toThrowError(new Error('Path does not have links')));
  it('Debe mostrar el status de los links', () => mdLinks(absolutePathMd)
    .then((resolve) => expect(resolve).toEqual(arrayGetStatus)));
});

// Test sobre el resolve : si es md .....
// describe('mdLinks', () => {
// it('Resuelve si el archivo tiene ext .md', () => mdLinks('./prueba/ejemplo.md').then((value) => {
//     expect(value).toEqual(true);
//   }));
// });
