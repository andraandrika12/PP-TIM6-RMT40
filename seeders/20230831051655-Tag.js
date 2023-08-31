'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let dataTag = fs.readFileSync("./data/tags.json", "utf-8")

    dataTag = JSON.parse(dataTag)

    dataTag.forEach(e => {
      delete e.id
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Tags', dataTag);

  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', dataTag);
  }
};
