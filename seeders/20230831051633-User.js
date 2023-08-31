'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let dataUser = fs.readFileSync("./data/users.json", "utf-8")

    dataUser = JSON.parse(dataUser)

    dataUser.forEach(e => {
      delete e.id
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Users', dataUser);

  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', dataUser);
  }
};