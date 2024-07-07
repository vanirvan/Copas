-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "original_url" TEXT NOT NULL,
    "shorten_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_shorten_url_key" ON "Link"("shorten_url");
