import { MigrationInterface, QueryRunner } from "typeorm";

export class notifications1665516484143 implements MigrationInterface {
    name = 'notifications1665516484143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientNotification" ("id" SERIAL NOT NULL, "neighborhood" character varying NOT NULL DEFAULT true, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, "categoryId" integer, CONSTRAINT "PK_827811e46f92c4e3b74bf76cfc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marketNotification" ("id" SERIAL NOT NULL, "neighborhood" character varying NOT NULL DEFAULT true, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_6f00e004bead974a4e76bc8828f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clientNotification" ADD CONSTRAINT "FK_61532ed199d1eafb55c8439fbcd" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clientNotification" ADD CONSTRAINT "FK_8251a699fb0087a056d2bd52ce4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marketNotification" ADD CONSTRAINT "FK_be1682b1954fc36ec3724d37b72" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "marketNotification" DROP CONSTRAINT "FK_be1682b1954fc36ec3724d37b72"`);
        await queryRunner.query(`ALTER TABLE "clientNotification" DROP CONSTRAINT "FK_8251a699fb0087a056d2bd52ce4"`);
        await queryRunner.query(`ALTER TABLE "clientNotification" DROP CONSTRAINT "FK_61532ed199d1eafb55c8439fbcd"`);
        await queryRunner.query(`DROP TABLE "marketNotification"`);
        await queryRunner.query(`DROP TABLE "clientNotification"`);
    }

}
