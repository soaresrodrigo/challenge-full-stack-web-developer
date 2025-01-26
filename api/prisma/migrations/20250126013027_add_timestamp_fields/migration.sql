ALTER TABLE "User" ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
ALTER TABLE "User" ADD COLUMN "updatedAt" TIMESTAMP DEFAULT NOW();

UPDATE "User" SET "createdAt" = NOW() WHERE "createdAt" IS NULL;
UPDATE "User" SET "updatedAt" = NOW() WHERE "updatedAt" IS NULL;

ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;
