ALTER TABLE items 
  ALTER COLUMN barcode SET NOT NULL,
  ALTER COLUMN unit SET NOT NULL,
  ALTER COLUMN expiration_date SET NOT NULL,
  ALTER COLUMN minimum_quantity SET NOT NULL;