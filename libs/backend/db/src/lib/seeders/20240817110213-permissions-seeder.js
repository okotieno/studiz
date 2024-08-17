'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const items = ['permission', 'permission', 'user', 'role'];
      let currentIndex = 0;
      let permissionObjects = [
        ...items.flatMap((item) =>
          item ? [`delete ${item}`, `update ${item}`, `create ${item}`] : []
        ),
        'give permission to role',
        'assign role to user',
      ].map((name, index) => {
        currentIndex = index + 1;
        return {
          id: currentIndex,
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      });
      await queryInterface.bulkInsert('permissions', permissionObjects, {});
    } catch (error) {
      // Handle the error here, you can log it or do any other necessary action
      console.error('Error while bulk inserting permissions:', error);
    }
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
