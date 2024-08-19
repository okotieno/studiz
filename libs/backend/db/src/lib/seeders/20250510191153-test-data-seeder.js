'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const email = 'otienoowenkelvin@gmail.com';
      await queryInterface.bulkInsert('users', [
        {
          first_name: 'Kelvin',
          last_name: 'Owen',
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ], {});

      const superAdminRoleId = await queryInterface.rawSelect(
        'roles',
        {
          where: {
            name: 'Super Admin'
          }
        },
        ['id']
      );

      const userId = await queryInterface.rawSelect(
        'users',
        {
          where: {
            email
          }
        },
        ['id']
      );

      await queryInterface.bulkInsert('role_user', [
        {
          role_id: superAdminRoleId,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ], {});

    } catch (error) {
      // Handle the error here, you can log it or do any other necessary action
      console.error('Error while bulk inserting users:', error);
    }
  },

  async down(queryInterface) {

    await queryInterface.bulkDelete('users', null, {});
  }
};
