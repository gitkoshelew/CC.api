'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const quizTable = await queryInterface.describeTable('quizzes');
    if (quizTable.topicId) return;
    try {
      await queryInterface.addColumn('quizzes', 'topicId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'topics',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('quizzes', 'topicId');
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
