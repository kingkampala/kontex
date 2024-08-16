module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex('Users', ['name'], {
            name: 'user_name_index',
            type: 'GIN',
            using: 'GIN',
            operatorClass: 'gin_trgm_ops'
        });

        await queryInterface.addIndex('Users', ['username'], {
            name: 'user_username_index',
            type: 'GIN',
            using: 'GIN',
            operatorClass: 'gin_trgm_ops'
        });

        await queryInterface.addIndex('Users', ['email'], {
            name: 'user_email_index',
            type: 'GIN',
            using: 'GIN',
            operatorClass: 'gin_trgm_ops'
        });

        await queryInterface.addIndex('Courses', ['title'], {
            name: 'course_title_index',
            type: 'GIN',
            using: 'GIN',
            operatorClass: 'gin_trgm_ops'
        });

        await queryInterface.addIndex('Courses', ['description'], {
            name: 'course_description_index',
            type: 'GIN',
            using: 'GIN',
            operatorClass: 'gin_trgm_ops'
        });

        await queryInterface.addIndex('Lessons', ['title'], {
            name: 'lesson_title_index',
            type: 'GIN',
            using: 'GIN',
            operatorClass: 'gin_trgm_ops'
        });

        await queryInterface.addIndex('Lessons', ['content'], {
            name: 'lesson_content_index',
            type: 'GIN',
            using: 'GIN',
            operatorClass: 'gin_trgm_ops'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('Users', 'user_name_index');
        await queryInterface.removeIndex('Users', 'user_username_index');
        await queryInterface.removeIndex('Users', 'user_email_index');

        await queryInterface.removeIndex('Courses', 'course_title_index');
        await queryInterface.removeIndex('Courses', 'course_description_index');

        await queryInterface.removeIndex('Lessons', 'lesson_title_index');
        await queryInterface.removeIndex('Lessons', 'lesson_content_index');
    }
};