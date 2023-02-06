const {
  pathIsAbsolute,
  pathExists,
  turnPathAbsolute,
  isExtensionMd,
  readFiles,
  getLinks,
  getLinkStatus,
} = require('../functions');

// -------------------------------TESTS DE FUNCTIONS.JS--------------------------------------------
const absolutePathMd = 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md';
const noExisteRuta = 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/noexiste.md';
const relativePath = 'prueba/ejemplo.md';
const absolutePathInvert = 'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md';
const htmlPath = './prueba/ejemplo.html';

// Test cuando SI existe la ruta
describe('pathExists: cuando SI existe RUTA', () => {
  it('Debe indicar TRUE cuando si existe ruta', () => {
    expect(pathExists(absolutePathMd)).toEqual(true);
  });
});
// Test cuando NO existe la ruta
describe('pathExists: cuando NO existe', () => {
  it('Debe indicar FALSE cuando no existe la ruta', () => {
    expect(pathExists(noExisteRuta)).toEqual(false);
  });
});
// Test cuando la ruta SI es absoluta
describe('pathIsAbsolute: cuando SI es absoluta', () => {
  it('Debe indicar TRUE cuandoo SI es absoluta', () => {
    expect(pathIsAbsolute(absolutePathMd)).toEqual(true);
  });
});
// Test cuando la ruta NO es absoluta
describe('pathIsAbsolute: cuando NO es absoluta', () => {
  it('Debe indicar FALSE cuando NO es absoluta', () => {
    expect(pathIsAbsolute(relativePath)).toEqual(false);
  });
});

// Test cuando la ruta es absoluta la deja igual/no la convierte
describe('turnPathAbsolute: Cuando es absoluta la deja igual', () => {
  it('Cuando la ruta es absoluta la deja igual', () => {
    expect(turnPathAbsolute(absolutePathMd)).toEqual(absolutePathMd);
  });
});

// Test cuando la ruta es relativa la cambia a absoluta
describe('turnPathAbsolute: la ruta relativa la cambia a absoluta', () => {
  it('Cuando la ruta es relativa la cambia a absoluta', () => {
    expect(turnPathAbsolute(relativePath)).toEqual(absolutePathInvert);
  });
});

// Test cuando el archivo SI tiene extension md
describe('isExtensionMd : Si archivo tiene extension md', () => {
  it('Devuelve TRUE si el arvhivo tiene extension .md', () => {
    expect(isExtensionMd(absolutePathMd)).toEqual(true);
  });
});

// Test cuando el archivo NO tiene extension md
describe('isExtensionMd : El archivo NO tiene extension md', () => {
  it('Devuelve FALSE si el arvhivo NO tiene extension .md', () => {
    expect(isExtensionMd(htmlPath)).toEqual(false);
  });
});
// Test readfiles de si esta leyendo el archivo
// describe('readFiles', () => {
//   it('Resuelve LEYENDO el archivo', async () => readFiles('./prueba/ejemplosinlinks.md')
// .then((value) => {
//    console.log(value)
//     expect(value).toEqual(
//       'Hola este es un ejemplo sin links',
//     );
//   }).catch(console.log));
// });

// Test getLinks
const array = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
];

test('getLinks', () => getLinks(
  'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
).then((data) => expect(data).toEqual(array)));

// Test de getLinkStatus
// test('getLinkStatus', () => getLinkStatus(
//   'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
// ).then((data) => expect(data).toEqual(
//   [
//     {
//       href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
//       text: 'description',
//       file: 'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
//       status: 200,
//       message: 'ok',
//     },
//   ],
// )));
