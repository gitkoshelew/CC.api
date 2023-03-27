'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const moderationTable = await queryInterface.describeTable('moderations');
    if (moderationTable.updatedTime) return;
    try {
      await queryInterface.addColumn('moderations', 'updatedTime', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
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
