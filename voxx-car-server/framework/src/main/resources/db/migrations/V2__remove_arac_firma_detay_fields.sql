-- Migration: Remove fields from tb_arac_firma_detay table
-- Fields to be removed:
-- - baslangic_tarihi
-- - bitis_tarihi  
-- - sozlesme_tutari
-- - aylik_fatura_tutari
-- - kapora

-- Drop the columns from tb_arac_firma_detay table
ALTER TABLE tb_arac_firma_detay 
DROP COLUMN IF EXISTS baslangic_tarihi,
DROP COLUMN IF EXISTS bitis_tarihi,
DROP COLUMN IF EXISTS sozlesme_tutari,
DROP COLUMN IF EXISTS aylik_fatura_tutari,
DROP COLUMN IF EXISTS kapora;
