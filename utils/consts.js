const validURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
const validRU = /[А-ЯËа-яё0-9]/;
const validEN = /^[A-Za-z0-9]/;

module.exports = {
  validURL,
  validRU,
  validEN,
};
