-- Add new profile fields to User table
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN "country" TEXT DEFAULT '0';

-- Update existing users to populate firstName and lastName from name field
UPDATE "User" 
SET "firstName" = CASE 
    WHEN "name" IS NOT NULL AND "name" != '' THEN 
        CASE 
            WHEN position(' ' in "name") > 0 THEN substring("name" from 1 for position(' ' in "name") - 1)
            ELSE "name"
        END
    ELSE NULL
END,
"lastName" = CASE 
    WHEN "name" IS NOT NULL AND "name" != '' AND position(' ' in "name") > 0 THEN 
        substring("name" from position(' ' in "name") + 1)
    ELSE NULL
END
WHERE "firstName" IS NULL OR "lastName" IS NULL;
