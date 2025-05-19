-- DropIndex
DROP INDEX "Cart_userId_open_key";

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "Cart"("userId");
