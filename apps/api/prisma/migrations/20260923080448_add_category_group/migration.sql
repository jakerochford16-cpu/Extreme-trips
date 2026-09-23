/*
  Warnings:

  - Added the required column `categoryGroup` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "countryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryGroup" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costType" TEXT NOT NULL,
    "costEstimate" TEXT,
    "currency" TEXT,
    "difficulty" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "permitRequired" BOOLEAN NOT NULL DEFAULT false,
    "guideRequired" BOOLEAN NOT NULL DEFAULT false,
    "bestSeason" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Activity_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("bestSeason", "category", "costEstimate", "costType", "countryId", "createdAt", "currency", "description", "difficulty", "guideRequired", "id", "latitude", "longitude", "permitRequired", "region", "riskLevel", "tags", "title") SELECT "bestSeason", "category", "costEstimate", "costType", "countryId", "createdAt", "currency", "description", "difficulty", "guideRequired", "id", "latitude", "longitude", "permitRequired", "region", "riskLevel", "tags", "title" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
CREATE INDEX "Activity_countryId_idx" ON "Activity"("countryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
