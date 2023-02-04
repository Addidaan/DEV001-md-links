/* eslint-disable no-undef */
const {
  pathIsAbsolute,
  pathExists,
  turnPathAbsolute,
  isExtensionMd,
  readFiles,
  getLinks,
  getLinkStatus,
} = require('../functions');
const { mdLinks } = require('../index');

// ----------------------------TESTS DE MDLINKS/INDEX.JS-------------------------------------------
// Test de cuando NO existe la ruta
describe('mdLinks', () => {
  it('Debe rechazar cuando el path no exixte', async () => expect(mdLinks('/path/noexiste.md', { validate: false })).rejects.toStrictEqual(new Error('Path does not exist')));
});

// Test sobre el reject : error no es md
describe('mdLinks', () => {
  it('Sale error si el archivo no es ext .md', () => mdLinks('./prueba/ejemplo.html', { validate: false }).catch((error) => {
    expect(error).toEqual(new Error('Path is not an extension file .md'));
  }));
});
// Test sobre el resolve : si es md .....
// describe('mdLinks', () => {
// it('Resuelve si el archivo tiene ext .md', () => mdLinks('./prueba/ejemplo.md').then((value) => {
//     expect(value).toEqual(true);
//   }));
// });

// -------------------------------TESTS DE FUNCTIONS.JS--------------------------------------------
// Test cuando SI existe la ruta
describe('pathExists: cuando SI existe RUTA', () => {
  it('Debe indicar TRUE cuando si existe ruta', () => {
    pathExists(
      'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    );
    expect(
      pathExists(
        'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
      ),
    ).toEqual(true);
  });
});
// Test cuando NO existe la ruta
describe('pathExists: cuando NO existe', () => {
  it('Debe indicar FALSE cuando no existe la ruta', () => {
    pathExists('');
    expect(pathExists('')).toEqual(false);
  });
});
// Test cuando la ruta SI es absoluta
describe('pathIsAbsolute: cuando SI es absoluta', () => {
  it('Debe indicar TRUE cuandoo SI es absoluta', () => {
    pathIsAbsolute(
      'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    );
    expect(
      pathIsAbsolute(
        'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
      ),
    ).toEqual(true);
  });
});
// Test cuando la ruta NO es absoluta
describe('pathIsAbsolute: cuando NO es absoluta', () => {
  it('Debe indicar FALSE cuando NO es absoluta', () => {
    pathIsAbsolute('prueba/ejemplo.md');
    expect(pathIsAbsolute('prueba/ejemplo.md')).toEqual(false);
  });
});

// Test cuando la ruta es absoluta la deja igual/no la convierte
describe('turnPathAbsolute: Cuando es absoluta la deja igual', () => {
  it('Cuando la ruta es absoluta la deja igual', () => {
    turnPathAbsolute(
      'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
    );
    expect(
      turnPathAbsolute(
        'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
      ),
    ).toEqual(
      'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
    );
  });
});
// Test cuando la ruta es relativa la cambia a absoluta
describe('turnPathAbsolute: la ruta relativa la cambia a absoluta', () => {
  it('Cuando la ruta es relativa la cambia a absoluta', () => {
    turnPathAbsolute('./prueba/ejemplo.md');
    expect(turnPathAbsolute('./prueba/ejemplo.md')).toEqual(
      'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
    );
  });
});

// Test cuando el archivo SI tiene extension md
describe('isExtensionMd : Si archivo tiene extension md', () => {
  it('Devuelve TRUE si el arvhivo tiene extension .md', () => {
    isExtensionMd('./prueba/ejemplo.md');
    expect(isExtensionMd('./prueba/ejemplo.md')).toEqual(true);
  });
});
// Test opcion 2 del test de arriba, cuando el archivo SI tiene extension md
describe('mdLinks', () => {
  it('Resuelve si el archivo tiene ext .md', () => {
    expect(isExtensionMd('./prueba/ejemplo.md')).toEqual(true);
  });
});
// Test cuando el archivo NO tiene extension md
describe('isExtensionMd : El archivo NO tiene extension md', () => {
  it('Devuelve FALSE si el arvhivo NO tiene extension .md', () => {
    isExtensionMd('./prueba/ejemplo.html');
    expect(isExtensionMd('./prueba/ejemplo.html')).toEqual(false);
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

test('getLinks', () => getLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md')
  .then((data) => expect(data).toEqual(array)));

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
