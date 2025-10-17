-- Remove fatura_no column from tb_bakim table
ALTER TABLE tb_bakim
DROP COLUMN fatura_no;

-- Change fatura column to TEXT type for Base64 file storage
ALTER TABLE tb_bakim
ALTER COLUMN fatura TYPE TEXT;
