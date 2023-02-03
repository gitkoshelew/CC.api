'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // addColumn field Update_time to check how far it has been updated
    try {
      await queryInterface.addColumn('moderations', 'updatedTime', {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async down(queryInterface, Sequelize) {
    // delete field Update_time to check how far it has been updated
    try {
      await queryInterface.removeColumn('moderations', 'updatedTime');
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
