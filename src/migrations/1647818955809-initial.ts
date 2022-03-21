import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1647818955809 implements MigrationInterface {
  name = 'initial1647818955809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."domain_requesttype_enum" AS ENUM('SHORT', 'LONG')`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "processedUrl" character varying NOT NULL, "requestType" "public"."domain_requesttype_enum" NOT NULL DEFAULT 'SHORT', CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "domain"`);
    await queryRunner.query(`DROP TYPE "public"."domain_requesttype_enum"`);
  }
}
