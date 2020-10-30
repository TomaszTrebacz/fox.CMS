import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactor1601023650882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "name" TO "firstName"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users RENAME COLUMN "firstName" TO "name"`,
    );
  }
}
