const generator = require('generate-password');

const generatePassword = () => {
  return (
    generator.generate({
      length: 6,
      numbers: true
    }) + generator.generate({
      length: 2,
      uppercase: false,
      lowercase: false,
      symbols: true,
    })
  );
};

module.exports = generatePassword;