const totalLinks = (array) => `${array.length}`;

const uniqueLinks = (array) => {
  const unique = new Set(array.map((link) => link.href));
  return `${unique.size}`;
};
// trater links rotos
const brokenLinks = (array) => {
  const broken = array.filter((link) => link.status === 'Fail' || link.status > 400 || link.status < 199);
  return `${broken.length}`;
};

module.exports = {
  totalLinks,
  uniqueLinks,
  brokenLinks,
};
