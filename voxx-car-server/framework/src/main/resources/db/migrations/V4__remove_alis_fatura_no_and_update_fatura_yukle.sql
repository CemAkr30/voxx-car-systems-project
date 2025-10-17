-- Remove alis_fatura_no column from tb_alisfaturasi table
ALTER TABLE tb_alisfaturasi
DROP COLUMN alis_fatura_no;

-- Change fatura_yukle column to TEXT type for Base64 file storage
ALTER TABLE tb_alisfaturasi
ALTER COLUMN fatura_yukle TYPE TEXT;
