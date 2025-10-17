-- Dashboard Tablolarına Örnek Kayıtlar
-- Bu dosya dashboard tablolarına her birine en az bir örnek kayıt ekler

-- 1. MARKA TABLOSUNA ÖRNEK KAYITLAR
INSERT INTO tb_marka (id, adi, is_deleted, created_at, updated_at) VALUES
                                                                       ('marka-001', 'Toyota', false, NOW(), NOW()),
                                                                       ('marka-002', 'Volkswagen', false, NOW(), NOW()),
                                                                       ('marka-003', 'Ford', false, NOW(), NOW()),
                                                                       ('marka-004', 'BMW', false, NOW(), NOW()),
                                                                       ('marka-005', 'Mercedes-Benz', false, NOW(), NOW()),
                                                                       ('marka-006', 'Audi', false, NOW(), NOW()),
                                                                       ('marka-007', 'Hyundai', false, NOW(), NOW()),
                                                                       ('marka-008', 'Renault', false, NOW(), NOW());

-- 2. MODEL TABLOSUNA ÖRNEK KAYITLAR
INSERT INTO tb_model (id, adi, marka_id, is_deleted, created_at, updated_at) VALUES
                                                                                 ('model-001', 'Corolla', 'marka-001', false, NOW(), NOW()),
                                                                                 ('model-002', 'Camry', 'marka-001', false, NOW(), NOW()),
                                                                                 ('model-003', 'Golf', 'marka-002', false, NOW(), NOW()),
                                                                                 ('model-004', 'Passat', 'marka-002', false, NOW(), NOW()),
                                                                                 ('model-005', 'Focus', 'marka-003', false, NOW(), NOW()),
                                                                                 ('model-006', 'Fiesta', 'marka-003', false, NOW(), NOW()),
                                                                                 ('model-007', '3 Serisi', 'marka-004', false, NOW(), NOW()),
                                                                                 ('model-008', '5 Serisi', 'marka-004', false, NOW(), NOW()),
                                                                                 ('model-009', 'C-Class', 'marka-005', false, NOW(), NOW()),
                                                                                 ('model-010', 'E-Class', 'marka-005', false, NOW(), NOW()),
                                                                                 ('model-011', 'A4', 'marka-006', false, NOW(), NOW()),
                                                                                 ('model-012', 'A6', 'marka-006', false, NOW(), NOW()),
                                                                                 ('model-013', 'i20', 'marka-007', false, NOW(), NOW()),
                                                                                 ('model-014', 'i30', 'marka-007', false, NOW(), NOW()),
                                                                                 ('model-015', 'Clio', 'marka-008', false, NOW(), NOW()),
                                                                                 ('model-016', 'Megane', 'marka-008', false, NOW(), NOW());

-- 3. FIRMA TABLOSUNA ÖRNEK KAYITLAR
INSERT INTO tb_firma (id, email, unvan, vergi_no, is_deleted, created_at, updated_at) VALUES
                                                                                          ('firma-001', 'info@abc-lojistik.com', 'ABC Lojistik A.Ş.', '1234567890', false, NOW(), NOW()),
                                                                                          ('firma-002', 'iletisim@xyz-nakliyat.com', 'XYZ Nakliyat Ltd. Şti.', '2345678901', false, NOW(), NOW()),
                                                                                          ('firma-003', 'info@def-kargo.com', 'DEF Kargo Hizmetleri A.Ş.', '3456789012', false, NOW(), NOW()),
                                                                                          ('firma-004', 'info@ghi-ulasim.com', 'GHI Ulaşım ve Turizm A.Ş.', '4567890123', false, NOW(), NOW()),
                                                                                          ('firma-005', 'info@jkl-tasima.com', 'JKL Taşımacılık Ltd. Şti.', '5678901234', false, NOW(), NOW());

-- 4. ARAÇ FİLO TABLOSUNA ÖRNEK KAYITLAR
INSERT INTO tb_aracfilo (id, plaka, marka_id, model_id, model_yili, segment, motor_no, sasi_no, renk, kasa_tipi, lastik_tipi, filoya_giris_tarihi, filoya_giris_km, tescil_tarihi, trafige_cikis_tarihi, garantisi_var_mi, garanti_baslangic_tarihi, garanti_suresi_yil, garanti_km, tramer, tramer_tutari, son_km_tarihi, son_km, son_yakit_miktari, filo_durum, muayene_bitis_tarihi, is_deleted, created_at, updated_at) VALUES
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-001', '34ABC123', 'marka-001', 'model-001', '2020', 'C', 'MOT001234', 'SAS001234', 'Beyaz', 'SEDAN', '205/55R16', '2020-01-15 10:00:00+00', '0', '2020-01-10 10:00:00+00', '2020-01-12 10:00:00+00', true, '2020-01-10 10:00:00+00', '3', '100000', true, 15000.00, '2024-01-15 10:00:00+00', '45000', '45', 1, '2024-12-31 23:59:59+00', false, NOW(), NOW()),
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-002', '34DEF456', 'marka-002', 'model-003', '2021', 'C', 'MOT002345', 'SAS002345', 'Gri', 'HATCHBACK', '215/50R17', '2021-03-20 10:00:00+00', '0', '2021-03-15 10:00:00+00', '2021-03-18 10:00:00+00', true, '2021-03-15 10:00:00+00', '3', '100000', true, 18000.00, '2024-01-20 10:00:00+00', '32000', '38', 1, '2025-06-30 23:59:59+00', false, NOW(), NOW()),
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-003', '34GHI789', 'marka-003', 'model-005', '2019', 'C', 'MOT003456', 'SAS003456', 'Siyah', 'HATCHBACK', '195/65R15', '2019-06-10 10:00:00+00', '0', '2019-06-05 10:00:00+00', '2019-06-08 10:00:00+00', false, NULL, NULL, NULL, false, NULL, '2024-01-10 10:00:00+00', '78000', '42', 1, '2024-11-15 23:59:59+00', false, NOW(), NOW()),
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-004', '34JKL012', 'marka-004', 'model-007', '2022', 'D', 'MOT004567', 'SAS004567', 'Mavi', 'SEDAN', '225/45R17', '2022-02-28 10:00:00+00', '0', '2022-02-25 10:00:00+00', '2022-02-27 10:00:00+00', true, '2022-02-25 10:00:00+00', '3', '100000', true, 25000.00, '2024-01-28 10:00:00+00', '25000', '50', 1, '2025-08-15 23:59:59+00', false, NOW(), NOW()),
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-005', '34MNO345', 'marka-005', 'model-009', '2023', 'D', 'MOT005678', 'SAS005678', 'Gümüş', 'SEDAN', '225/50R17', '2023-01-10 10:00:00+00', '0', '2023-01-05 10:00:00+00', '2023-01-08 10:00:00+00', true, '2023-01-05 10:00:00+00', '3', '100000', true, 35000.00, '2024-01-10 10:00:00+00', '15000', '48', 1, '2026-01-05 23:59:59+00', false, NOW(), NOW()),
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-006', '34PQR678', 'marka-006', 'model-011', '2020', 'D', 'MOT006789', 'SAS006789', 'Kırmızı', 'SEDAN', '225/50R17', '2020-09-15 10:00:00+00', '0', '2020-09-10 10:00:00+00', '2020-09-12 10:00:00+00', false, NULL, NULL, NULL, true, 22000.00, '2024-01-15 10:00:00+00', '55000', '40', 0, '2024-09-10 23:59:59+00', false, NOW(), NOW()),
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-007', '34STU901', 'marka-007', 'model-013', '2021', 'B', 'MOT007890', 'SAS007890', 'Beyaz', 'HATCHBACK', '185/65R15', '2021-05-20 10:00:00+00', '0', '2021-05-15 10:00:00+00', '2021-05-18 10:00:00+00', true, '2021-05-15 10:00:00+00', '3', '100000', false, NULL, '2024-01-20 10:00:00+00', '28000', '35', 1, '2025-05-15 23:59:59+00', false, NOW(), NOW()),
                                                                                                                                                                                                                                                                                                                                                                                                                                ('arac-008', '34VWX234', 'marka-008', 'model-015', '2018', 'B', 'MOT008901', 'SAS008901', 'Gri', 'HATCHBACK', '175/70R13', '2018-11-30 10:00:00+00', '0', '2018-11-25 10:00:00+00', '2018-11-28 10:00:00+00', false, NULL, NULL, NULL, false, NULL, '2024-01-30 10:00:00+00', '95000', '30', 0, '2024-11-25 23:59:59+00', false, NOW(), NOW());

-- 5. MTV TABLOSUNA ÖRNEK KAYITLAR
INSERT INTO tb_mtv (id, arac_filo_id, yil, taksit, makbuz_no, miktar, odeme_tipi, mtv_odeyen_firma, aciklama, gecikme_cezasi, odendi, is_deleted, created_at, updated_at) VALUES
                                                                                                                                                                              ('mtv-001', 'arac-001', '2024', '01', 'MTV2024001', 1250.00, 'BANKA_EFT', 'firma-001', '2024 yılı 1. taksit MTV ödemesi', '0', true, false, NOW(), NOW()),
                                                                                                                                                                              ('mtv-002', 'arac-001', '2024', '02', 'MTV2024002', 1250.00, 'ODENMEDI', 'firma-001', '2024 yılı 2. taksit MTV ödemesi', '125.00', false, false, NOW(), NOW()),
                                                                                                                                                                              ('mtv-003', 'arac-002', '2024', '01', 'MTV2024003', 1350.00, 'NAKIT', 'firma-002', '2024 yılı 1. taksit MTV ödemesi', '0', true, false, NOW(), NOW()),
                                                                                                                                                                              ('mtv-004', 'arac-002', '2024', '02', 'MTV2024004', 1350.00, 'BANKA_HAVALE', 'firma-002', '2024 yılı 2. taksit MTV ödemesi', '0', true, false, NOW(), NOW()),
                                                                                                                                                                              ('mtv-005', 'arac-003', '2024', '01', 'MTV2024005', 1100.00, 'ODENMEDI', 'firma-003', '2024 yılı 1. taksit MTV ödemesi', '220.00', false, false, NOW(), NOW()),
                                                                                                                                                                              ('mtv-006', 'arac-004', '2024', '01', 'MTV2024006', 1800.00, 'MASTERCARD', 'firma-004', '2024 yılı 1. taksit MTV ödemesi', '0', true, false, NOW(), NOW()),
                                                                                                                                                                              ('mtv-007', 'arac-005', '2024', '01', 'MTV2024007', 2000.00, 'VISA', 'firma-005', '2024 yılı 1. taksit MTV ödemesi', '0', true, false, NOW(), NOW()),
                                                                                                                                                                              ('mtv-008', 'arac-006', '2024', '01', 'MTV2024008', 1600.00, 'ODENMEDI', 'firma-001', '2024 yılı 1. taksit MTV ödemesi', '320.00', false, false, NOW(), NOW());

-- 6. MUAYENE TABLOSUNA ÖRNEK KAYITLAR
-- Dashboard'da görünecek kayıtlar: 15 gün içinde bitecek muayeneler
INSERT INTO tb_muayene (id, arac_filo_id, muayene_tipi, makbuz_no, odeyen_firma_id, gecikme_cezasi, aciklama, yeri, odeme_tipi, miktar, odendi, baslangic_tarihi, bitis_tarihi, is_deleted, created_at, updated_at) VALUES
-- 15 gün içinde bitecek muayeneler (Dashboard'da görünecek)
('muayene-001', 'arac-001', 'FENNI', 'MUY2024001', 'firma-001', '0', '2024 yılı fenni muayene', 'İstanbul TÜVTÜRK', 'BANKA_EFT', 450.00, true, '2024-01-15 10:00:00+00', (CURRENT_DATE + INTERVAL '10 days')::timestamp, false, NOW(), NOW()),
('muayene-002', 'arac-002', 'FENNI', 'MUY2024002', 'firma-002', '0', '2024 yılı fenni muayene', 'Ankara TÜVTÜRK', 'NAKIT', 450.00, true, '2024-03-20 10:00:00+00', (CURRENT_DATE + INTERVAL '5 days')::timestamp, false, NOW(), NOW()),
('muayene-003', 'arac-003', 'FENNI', 'MUY2024003', 'firma-003', '90.00', '2024 yılı fenni muayene - gecikmeli', 'İzmir TÜVTÜRK', 'ODENMEDI', 450.00, false, '2024-01-10 10:00:00+00', (CURRENT_DATE + INTERVAL '3 days')::timestamp, false, NOW(), NOW()),
('muayene-004', 'arac-004', 'FENNI', 'MUY2024004', 'firma-004', '0', '2024 yılı fenni muayene', 'Bursa TÜVTÜRK', 'MASTERCARD', 450.00, true, '2024-02-28 10:00:00+00', (CURRENT_DATE + INTERVAL '12 days')::timestamp, false, NOW(), NOW()),
('muayene-005', 'arac-005', 'FENNI', 'MUY2024005', 'firma-005', '0', '2024 yılı fenni muayene', 'Antalya TÜVTÜRK', 'VISA', 450.00, true, '2024-01-10 10:00:00+00', (CURRENT_DATE + INTERVAL '7 days')::timestamp, false, NOW(), NOW()),
-- Uzun vadeli muayeneler (Dashboard'da görünmeyecek)
('muayene-006', 'arac-006', 'FENNI', 'MUY2024006', 'firma-001', '0', '2024 yılı fenni muayene', 'İstanbul TÜVTÜRK', 'BANKA_HAVALE', 450.00, true, '2024-01-15 10:00:00+00', '2025-06-30 23:59:59+00', false, NOW(), NOW()),
('muayene-007', 'arac-007', 'FENNI', 'MUY2024007', 'firma-002', '0', '2024 yılı fenni muayene', 'Ankara TÜVTÜRK', 'NAKIT', 450.00, true, '2024-01-20 10:00:00+00', '2025-05-15 23:59:59+00', false, NOW(), NOW()),
('muayene-008', 'arac-008', 'FENNI', 'MUY2024008', 'firma-003', '180.00', '2024 yılı fenni muayene - gecikmeli', 'İzmir TÜVTÜRK', 'ODENMEDI', 450.00, false, '2024-01-30 10:00:00+00', '2025-11-25 23:59:59+00', false, NOW(), NOW());

-- 7. SİGORTA TABLOSUNA ÖRNEK KAYITLAR
-- Dashboard'da görünecek kayıtlar: 15 gün içinde bitecek sigortalar
INSERT INTO tb_sigorta (id, arac_filo_id, tip, sigorta_sirketi, acente, police_no, baslangic_tarihi, bitis_tarihi, sozlesme, is_deleted, created_at, updated_at) VALUES
-- 15 gün içinde bitecek sigortalar (Dashboard'da görünecek)
('sigorta-001', 'arac-001', 'KASKO', 'Axa Sigorta', 'Axa İstanbul Şubesi', 'AXA2024001', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '8 days')::timestamp, 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-002', 'arac-001', 'TRAFIK', 'Axa Sigorta', 'Axa İstanbul Şubesi', 'AXA2024002', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '8 days')::timestamp, 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-003', 'arac-002', 'KASKO', 'Allianz Sigorta', 'Allianz Ankara Şubesi', 'ALL2024001', '2024-03-01 00:00:00+00', (CURRENT_DATE + INTERVAL '4 days')::timestamp, 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-004', 'arac-002', 'TRAFIK', 'Allianz Sigorta', 'Allianz Ankara Şubesi', 'ALL2024002', '2024-03-01 00:00:00+00', (CURRENT_DATE + INTERVAL '4 days')::timestamp, 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-005', 'arac-003', 'KASKO', 'Ziraat Sigorta', 'Ziraat İzmir Şubesi', 'ZIR2024001', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '2 days')::timestamp, 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-006', 'arac-003', 'TRAFIK', 'Ziraat Sigorta', 'Ziraat İzmir Şubesi', 'ZIR2024002', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '2 days')::timestamp, 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-007', 'arac-004', 'KASKO', 'Anadolu Sigorta', 'Anadolu Bursa Şubesi', 'ANA2024001', '2024-02-01 00:00:00+00', (CURRENT_DATE + INTERVAL '14 days')::timestamp, 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-008', 'arac-004', 'TRAFIK', 'Anadolu Sigorta', 'Anadolu Bursa Şubesi', 'ANA2024002', '2024-02-01 00:00:00+00', (CURRENT_DATE + INTERVAL '14 days')::timestamp, 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-009', 'arac-005', 'KASKO', 'Mapfre Sigorta', 'Mapfre Antalya Şubesi', 'MAP2024001', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '6 days')::timestamp, 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-010', 'arac-005', 'TRAFIK', 'Mapfre Sigorta', 'Mapfre Antalya Şubesi', 'MAP2024002', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '6 days')::timestamp, 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW()),
-- Uzun vadeli sigortalar (Dashboard'da görünmeyecek)
('sigorta-011', 'arac-006', 'KASKO', 'Axa Sigorta', 'Axa İstanbul Şubesi', 'AXA2024003', '2024-01-01 00:00:00+00', '2025-12-31 23:59:59+00', 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-012', 'arac-006', 'TRAFIK', 'Axa Sigorta', 'Axa İstanbul Şubesi', 'AXA2024004', '2024-01-01 00:00:00+00', '2025-12-31 23:59:59+00', 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-013', 'arac-007', 'KASKO', 'Allianz Sigorta', 'Allianz Ankara Şubesi', 'ALL2024003', '2024-01-01 00:00:00+00', '2025-01-01 00:00:00+00', 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-014', 'arac-007', 'TRAFIK', 'Allianz Sigorta', 'Allianz Ankara Şubesi', 'ALL2024004', '2024-01-01 00:00:00+00', '2025-01-01 00:00:00+00', 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-015', 'arac-008', 'KASKO', 'Ziraat Sigorta', 'Ziraat İzmir Şubesi', 'ZIR2024003', '2024-01-01 00:00:00+00', '2025-12-31 23:59:59+00', 'Kasko sigortası sözleşmesi - 2024', false, NOW(), NOW()),
('sigorta-016', 'arac-008', 'TRAFIK', 'Ziraat Sigorta', 'Ziraat İzmir Şubesi', 'ZIR2024004', '2024-01-01 00:00:00+00', '2025-12-31 23:59:59+00', 'Trafik sigortası sözleşmesi - 2024', false, NOW(), NOW());

-- 8. ARAÇ FİRMA DETAY TABLOSUNA ÖRNEK KAYITLAR (KİRALAMA BİLGİLERİ)
-- Dashboard'da görünecek kayıtlar: 15 gün içinde sözleşmesi bitecek kiralama sözleşmeleri
INSERT INTO tb_arac_firma_detay (id, arac_filo_id, firma_id, sozlesme_baslangic_tarihi, sozlesme_bitis_tarihi, teslimat_tutanagi, sozlesme, odeme_vadesi, is_deleted, created_at, updated_at) VALUES
-- 15 gün içinde bitecek kiralama sözleşmeleri (Dashboard'da görünecek)
('detay-001', 'arac-001', 'firma-001', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '8 days')::timestamp, 'Araç teslim tutanağı - 34ABC123', 'Kira sözleşmesi - 2024 yılı', 30, false, NOW(), NOW()),
('detay-002', 'arac-002', 'firma-002', '2024-03-01 00:00:00+00', (CURRENT_DATE + INTERVAL '12 days')::timestamp, 'Araç teslim tutanağı - 34DEF456', 'Kira sözleşmesi - 2024 yılı', 30, false, NOW(), NOW()),
('detay-003', 'arac-003', 'firma-003', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '3 days')::timestamp, 'Araç teslim tutanağı - 34GHI789', 'Kira sözleşmesi - 2024 yılı', 15, false, NOW(), NOW()),
('detay-004', 'arac-004', 'firma-004', '2024-02-01 00:00:00+00', (CURRENT_DATE + INTERVAL '15 days')::timestamp, 'Araç teslim tutanağı - 34JKL012', 'Kira sözleşmesi - 2024 yılı', 30, false, NOW(), NOW()),
('detay-005', 'arac-005', 'firma-005', '2024-01-01 00:00:00+00', (CURRENT_DATE + INTERVAL '6 days')::timestamp, 'Araç teslim tutanağı - 34MNO345', 'Kira sözleşmesi - 2024 yılı', 30, false, NOW(), NOW()),
-- Uzun vadeli kiralama sözleşmeleri (Dashboard'da görünmeyecek)
('detay-006', 'arac-006', 'firma-001', '2024-01-01 00:00:00+00', '2025-12-31 23:59:59+00', 'Araç teslim tutanağı - 34PQR678', 'Kira sözleşmesi - 2024-2025 yılı', 30, false, NOW(), NOW()),
('detay-007', 'arac-007', 'firma-002', '2024-01-01 00:00:00+00', '2025-06-30 23:59:59+00', 'Araç teslim tutanağı - 34STU901', 'Kira sözleşmesi - 2024-2025 yılı', 15, false, NOW(), NOW()),
('detay-008', 'arac-008', 'firma-003', '2024-01-01 00:00:00+00', '2025-01-31 23:59:59+00', 'Araç teslim tutanağı - 34VWX234', 'Kira sözleşmesi - 2024-2025 yılı', 30, false, NOW(), NOW());

-- NOT: Bu örnek kayıtlar dashboard tablolarında görüntülenecek verileri içerir:
-- - MTV tablosunda ödenen ve ödenmemiş kayıtlar
-- - Muayene tablosunda 15 gün içinde bitecek kayıtlar (ödenen/ödenmemiş)
-- - Sigorta tablosunda 15 gün içinde bitecek kayıtlar
-- - Araç Filo tablosunda aktif ve pasif araçlar
-- - Firma tablosunda kiralama yapan firmalar
-- - Araç Firma Detay tablosunda 15 gün içinde sözleşmesi bitecek kiralama bilgileri