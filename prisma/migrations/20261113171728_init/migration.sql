-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Location_visitorId_idx" ON "Location"("visitorId");

-- CreateIndex
CREATE INDEX "Location_createdAt_idx" ON "Location"("createdAt");
