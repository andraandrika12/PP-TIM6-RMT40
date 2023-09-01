'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let dataPostTag = fs.readFileSync("./data/postTags.json", "utf-8")

    dataPostTag = JSON.parse(dataPostTag)

    dataPostTag.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('PostTags', dataPostTag);

  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PostTags', dataPostTag);
  }
};
