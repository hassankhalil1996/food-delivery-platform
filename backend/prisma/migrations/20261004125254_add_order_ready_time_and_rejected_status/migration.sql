-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "estimatedReadyAt" TIMESTAMP(3);
