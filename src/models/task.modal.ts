import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}


interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'description' | 'status'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: 'pending' | 'completed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    }
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true
  }
);

export default Task;