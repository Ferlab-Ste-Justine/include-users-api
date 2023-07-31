import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '../config';

interface IUserAttributes {
    id: number;
    keycloak_id: string;
    first_name?: string;
    last_name?: string;
    era_commons_id?: string;
    nih_ned_id?: string;
    email?: string;
    linkedin?: string;
    public_email?: string;
    external_individual_fullname?: string;
    external_individual_email?: string;
    profile_image_key?: string;
    roles?: string[];
    affiliation?: string;
    portal_usages?: string[];
    research_domains?: string[];
    research_area_description?: string;
    creation_date: Date;
    updated_date: Date;
    consent_date?: Date;
    accepted_terms: boolean;
    understand_disclaimer: boolean;
    commercial_use_reason?: string;
    completed_registration: boolean;
    deleted: boolean;
    config?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserInput extends IUserAttributes {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserOuput extends IUserAttributes {}

class UserModel extends Model<IUserAttributes, IUserInput> implements IUserAttributes {
    public id!: number;
    public keycloak_id!: string;
    public commercial_use_reason: string;
    public accepted_terms: boolean;
    public understand_disclaimer: boolean;
    public completed_registration: boolean;
    public creation_date!: Date;
    public updated_date!: Date;
    public deleted: boolean;
    public roles: string[];
    public portal_usages: string[];
}

UserModel.init(
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            validate: {
                isInt: true,
            },
        },
        keycloak_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUUID: 4,
            },
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                isBoolean: true,
            },
        },
        first_name: {
            type: DataTypes.CITEXT,
            validate: {
                len: [1, 20],
                isAlpha: true,
            },
        },
        last_name: {
            type: DataTypes.CITEXT,
            validate: {
                len: [1, 20],
                isAlpha: true,
            },
        },
        era_commons_id: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
            },
        },
        nih_ned_id: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
            },
        },
        commercial_use_reason: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        external_individual_fullname: {
            type: DataTypes.TEXT,
            validate: {
                isAlpha: true,
            },
        },
        external_individual_email: {
            type: DataTypes.TEXT,
            validate: {
                isEmail: true,
            },
        },
        roles: DataTypes.ARRAY(DataTypes.CITEXT),
        affiliation: {
            type: DataTypes.CITEXT,
            validate: {
                isAlphanumeric: true,
            },
        },
        public_email: {
            type: DataTypes.TEXT,
            validate: {
                isEmail: true,
            },
        },
        linkedin: {
            type: DataTypes.TEXT,
            validate: {
                isUrl: true,
                is: /^https?:\/\/(www\.)?linkedin\.com\/in\//i,
            },
        },
        portal_usages: DataTypes.ARRAY(DataTypes.CITEXT),
        research_domains: DataTypes.ARRAY(DataTypes.CITEXT),
        research_area_description: DataTypes.TEXT,
        profile_image_key: DataTypes.TEXT,
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            validate: {
                isDate: true,
            },
        },
        updated_date: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            validate: {
                isDate: true,
            },
        },
        consent_date: DataTypes.DATE,
        accepted_terms: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                isBoolean: true,
            },
        },
        understand_disclaimer: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                isBoolean: true,
            },
        },
        completed_registration: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                isBoolean: true,
            },
        },
        config: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            validate: {
                isJSON: true,
            },
        },
    },
    { sequelize: sequelizeConnection, modelName: 'users', timestamps: false },
);

export default UserModel;
