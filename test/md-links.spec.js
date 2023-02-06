/* eslint-disable no-undef */

const { mdLinks } = require('../index');

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
  it('Debe rechazar cuando el path no exixte', () => expect(mdLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/noexiste.md')).rejects.toThrowError(new Error('Path does not exist')));
  it.skip('Debe rechazar si el archivo no es ext .md', () => mdLinks('./prueba/ejemplo.html').catch((error) => {
    expect(error).toStrictEqual(new Error('Path is not an extension file .md'));
  }));
  it('Debe rechazar cuando no tiene links', () => expect(mdLinks('C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplosinLinks.md')).rejects.toThrowError(new Error('Path does not have links')));
});
// Test sobre el reject : error no es md
// describe('mdLinks', () => {
//   it('Debe rechazar si el archivo no es ext .md', () => mdLinks('./prueba/ejemplo.html', { validate: false }).catch((error) => {
//     expect(error).toEqual(new Error('Path is not an extension file .md'));
//   }));
// });

// describe('mdLinks', () => {
//   it('Debe rechazar cuando no tiene links', () => mdLinks('./prueba/ejemplosinLinks.js', { validate: false }).catch((error) => {
//     expect(error).toEqual(new Error('Path does not have links'));
//   }));
// });
// Test sobre el resolve : si es md .....
// describe('mdLinks', () => {
// it('Resuelve si el archivo tiene ext .md', () => mdLinks('./prueba/ejemplo.md').then((value) => {
//     expect(value).toEqual(true);
//   }));
// });
