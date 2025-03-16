import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const ApiKey = sequelize.define('ApiKey', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
    },
    keyHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credit_used: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    },
    permissions: {
        type: DataTypes.ENUM('read', 'write', 'selfmanage', 'worker'),
        allowNull: false,
        defaultValue: 'read'
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: (apiKey) => {
            apiKey.key = crypto.randomBytes(32).toString('hex');
        }
    }
});

ApiKey.generateKey = async function () {
    const rawKey = crypto.randomBytes(32).toString('hex');
    const hashedKey = await bcrypt.hash(rawKey, 10);

    return { rawKey, hashedKey };
};

ApiKey.verifyKey = async function (inputKey, storedHash) {
    return await bcrypt.compare(inputKey, storedHash);
};

export default ApiKey;
