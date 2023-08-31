'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let dataUserProfile = fs.readFileSync("./data/userProfiles.json", "utf-8")

    dataUserProfile = JSON.parse(dataUserProfile)

    dataUserProfile.forEach(e => {
      delete e.id
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('UserProfiles', dataUserProfile);

  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserProfiles', dataUserProfile);
  }
};
