import { MigrationInterface, QueryRunner } from "typeorm";

export class database1664060565163 implements MigrationInterface {
    name = 'database1664060565163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "market" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "ownerName" character varying NOT NULL, "email" character varying NOT NULL, "neighborhood" character varying NOT NULL, "adNumber" integer NOT NULL, "location" character varying NOT NULL, "cep" character varying NOT NULL, CONSTRAINT "PK_1e9a2963edfd331d92018e3abac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "priceHistory" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "marketProductId" integer, CONSTRAINT "PK_cefd61c8c95eb4b9c8e11ed352f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marketProduct" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "Price" integer NOT NULL, "boosted" boolean NOT NULL, "active" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, "marketId" integer, CONSTRAINT "PK_b349f00ca1a0cfc6f9244dba70c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productCategory" ("id" SERIAL NOT NULL, "productId" integer, "categoryId" integer, CONSTRAINT "PK_1012430e55dad863919f1221a72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nickname" character varying NOT NULL, "neighborhood" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "receiveEmail" boolean NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productSelectionLog" ("id" SERIAL NOT NULL, "neighborhood" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, "categoryId" integer, CONSTRAINT "PK_9493b47c57e2aee7a7d701f9994" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "priceHistory" ADD CONSTRAINT "FK_27cc28d73c9a5c5bdd42d08cb0b" FOREIGN KEY ("marketProductId") REFERENCES "marketProduct"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marketProduct" ADD CONSTRAINT "FK_3c0ac9ce1a28f9a0f1038f36d53" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marketProduct" ADD CONSTRAINT "FK_59b1d3aad2e2eb63bcd8caca7ea" FOREIGN KEY ("marketId") REFERENCES "market"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productCategory" ADD CONSTRAINT "FK_b5636f5a7cd6d73bcb2478964e5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productCategory" ADD CONSTRAINT "FK_f309c7648b292adae802ee47f09" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productSelectionLog" ADD CONSTRAINT "FK_4e15cd32e803f1f01233a4077d6" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productSelectionLog" ADD CONSTRAINT "FK_f2a360e823f1f113794659a777b" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productSelectionLog" DROP CONSTRAINT "FK_f2a360e823f1f113794659a777b"`);
        await queryRunner.query(`ALTER TABLE "productSelectionLog" DROP CONSTRAINT "FK_4e15cd32e803f1f01233a4077d6"`);
        await queryRunner.query(`ALTER TABLE "productCategory" DROP CONSTRAINT "FK_f309c7648b292adae802ee47f09"`);
        await queryRunner.query(`ALTER TABLE "productCategory" DROP CONSTRAINT "FK_b5636f5a7cd6d73bcb2478964e5"`);
        await queryRunner.query(`ALTER TABLE "marketProduct" DROP CONSTRAINT "FK_59b1d3aad2e2eb63bcd8caca7ea"`);
        await queryRunner.query(`ALTER TABLE "marketProduct" DROP CONSTRAINT "FK_3c0ac9ce1a28f9a0f1038f36d53"`);
        await queryRunner.query(`ALTER TABLE "priceHistory" DROP CONSTRAINT "FK_27cc28d73c9a5c5bdd42d08cb0b"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "productSelectionLog"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "productCategory"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "marketProduct"`);
        await queryRunner.query(`DROP TABLE "priceHistory"`);
        await queryRunner.query(`DROP TABLE "market"`);
    }

}
