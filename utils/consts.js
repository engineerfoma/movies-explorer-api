const validURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
const validRU = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
const validEN = /^[?!,.a-zA-Z0-9\s]+$ /;

module.exports = {
  validURL,
  validRU,
  validEN,
};
