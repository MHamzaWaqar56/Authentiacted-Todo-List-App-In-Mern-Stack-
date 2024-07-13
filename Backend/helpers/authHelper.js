const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// compare password
const comparePassword = async (password, hashedPassword) => {
  const comparedPassword = bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};

module.exports = {
  hashPassword,
  comparePassword,
};
