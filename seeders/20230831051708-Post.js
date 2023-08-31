'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let dataPost = fs.readFileSync("./data/posts.json", "utf-8")

    dataPost = JSON.parse(dataPost)

    dataPost.forEach(e => {
      delete e.id
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Posts', dataPost);

  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', dataPost);
  }
};
