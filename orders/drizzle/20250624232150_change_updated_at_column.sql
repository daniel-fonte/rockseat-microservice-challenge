ALTER TABLE "Orders" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Orders" ALTER COLUMN "updated_at" SET NOT NULL;