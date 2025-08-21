# Database Migration for User Profile Fields

## Overview
This migration adds new fields to the User table to store user profile information:
- `firstName` - User's first name
- `lastName` - User's last name  
- `country` - User's country preference (defaults to "0" for Australia)

## Migration Steps

### 1. Apply the Database Changes
Run the following SQL commands in your PostgreSQL database:

```sql
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
```

### 2. Regenerate Prisma Client
After applying the migration, regenerate the Prisma client:

```bash
npx prisma generate
```

### 3. Verify the Changes
The new fields should now be available in your User model and the profile form should properly save and retrieve:
- First Name
- Last Name  
- Country selection

## Country Values
- "0" = Australia (default)
- "1" = America
- "2" = England

## Notes
- Existing users will have their `firstName` and `lastName` automatically populated from their existing `name` field
- The `country` field defaults to "0" (Australia) for all users
- The profile form now properly persists all fields to the database
