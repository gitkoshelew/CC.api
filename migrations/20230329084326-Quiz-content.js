'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'content');
  },

   down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('questions', 'content', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },
  
};
