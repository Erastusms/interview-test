"use strict";
const fs = require("fs");
const { encrypter } = require("../helpers/bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   username: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let users = JSON.parse(fs.readFileSync("./seeders/user.json", "utf8"));
    let userData = users.map((user) => {
      const { username, password } = user;
      const newPassword = encrypter(password);
      return {
        username,
        password: newPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Users", userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
