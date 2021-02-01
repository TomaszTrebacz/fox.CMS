import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1612220854337 implements MigrationInterface {
    name = 'SchemaSync1612220854337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "password" character varying(128) NOT NULL, "phoneNumber" character varying(50) NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP DEFAULT now(), CONSTRAINT "UNIQUE_TEST" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USER" ON "users" ("id", "email", "phoneNumber") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_USER"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
