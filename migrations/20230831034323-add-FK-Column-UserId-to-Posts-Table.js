'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Posts", "UserId", {
      type : "INTEGER",
      allowNull: false,
      references: {
        model: "Users"
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Posts", "UserId")
  }
};
