const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');
const Course = require('./course');

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.UUID,
    references: {
      model: 'courses',
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'lessons',
  timestamps: true,
});

Course.hasMany(Lesson, { foreignKey: 'courseId', onDelete: 'CASCADE' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Lesson;