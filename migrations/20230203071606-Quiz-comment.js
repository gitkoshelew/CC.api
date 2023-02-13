'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // addColumn field description to quiz table
    try {
      await queryInterface.addColumn('quizzes', 'comment', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('quizzes', 'comment');
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
