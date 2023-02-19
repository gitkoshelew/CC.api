'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // addColumn field description to quiz table
    try {
      await queryInterface.addColumn('quizzes', 'creationDate', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('quizzes', 'creationDate');
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
