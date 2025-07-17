-- ENUM TYPE'ları oluştur
CREATE TYPE adres_tipi AS ENUM (
    'MERKEZ', 'SUBE', 'SHOWROOM', 'SERVIS', 'DEPO', 'FATURA', 'MUHASEBE', 'TESLIMAT', 'YETKILI_BAYI', 'DIGER'
);

CREATE TYPE bakim_nedeni AS ENUM ('YILLIK', 'HASAR');

CREATE TYPE cinsiyet AS ENUM ('ERKEK', 'KADIN', 'DIGER');

CREATE TYPE ehliyet_tipi AS ENUM ('A1', 'A2', 'A', 'B1', 'B', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'D', 'DE', 'F', 'G', 'M');

CREATE TYPE filodan_cikis_nedeni AS ENUM ('SATIS', 'PERT', 'CALINTI', 'GALERI', 'GECICI', 'PLAKADEGISIKLIK', 'DIGER');

CREATE TYPE hasarli_parca AS ENUM (
    'SAG_ON_TAMPON', 'SOL_ON_TAMPON', 'ON_TAMPON', 'KAPUT', 'SAG_ON_KAPI', 'SAG_ARKA_KAPI', 'SOL_ON_KAPI', 'SOL_ARKA_KAPI', 'TAVAN', 'ARKA_TAMPON', 'BAGAJ_KAPAGI'
);

CREATE TYPE hasar_tipi AS ENUM ('ORIJINAL', 'LOKALBOYALI', 'BOYALI', 'DEGISEN');

CREATE TYPE iletisim_tipi AS ENUM (
    'TELEFON', 'CEP_TELEFONU', 'FAKS', 'E_POSTA', 'WEB_SITESI', 'WHATSAPP', 'LINKEDIN', 'INSTAGRAM', 'FACEBOOK', 'TWITTER', 'DIGER'
);

CREATE TYPE muayene_tipi AS ENUM ('EGZOS', 'FENNI');

CREATE TYPE odeme_tipi AS ENUM (
    'AMERICAN_EXPRESS', 'NAKIT', 'BANKA_EFT', 'CARI_HESAP', 'BANKA_HAVALE', 'IKRAM', 'MASTERCARD', 'VOUCHER', 'VISA'
);

CREATE TYPE onarim_durumu AS ENUM (
    'SERVISE_BEKLENIYOR', 'EKSPER_BEKLENIYOR', 'ONARIM_BEKLENIYOR', 'PARCA_BEKLENIYOR', 'KAPORTADA', 'BOYADA', 'MEKANIKTE', 'TESLIME_HAZIR', 'TESLIM_EDILDI'
);

CREATE TYPE para_birimi AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'TRY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR');

CREATE TYPE sigorta_tipi AS ENUM ('KASKO', 'TRAFIK');

-- Tablolar ve Foreign Key'lerle beraber:

CREATE TABLE "tb_firma" (
                            "id" character varying PRIMARY KEY,
                            "email" VARCHAR(255),
                            "unvan" VARCHAR(255),
                            "vergi_no" VARCHAR(255),
                            "is_deleted" BOOLEAN DEFAULT FALSE,
                            "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                            "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_adres" (
                            "id" character varying PRIMARY KEY,
                            "aciklama" TEXT,
                            "tip" adres_tipi,
                            "firma_id" character varying,
                            "is_deleted" BOOLEAN DEFAULT FALSE,
                            "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                            "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_alisfaturasi" (
                                   "id" character varying PRIMARY KEY,
                                   "arac_filo_id" character varying,
                                   "alis_faturasi_tarihi" TIMESTAMPTZ,
                                   "alis_fatura_no" VARCHAR(255),
                                   "satici_firma_id" character varying,
                                   "liste_fiyati" DOUBLE PRECISION,
                                   "ek_garanti" INTEGER,
                                   "mal_degeri" DOUBLE PRECISION,
                                   "iskonto" DOUBLE PRECISION,
                                   "nakliye_bedeli" DOUBLE PRECISION,
                                   "otv_matrah" DOUBLE PRECISION,
                                   "otv" DOUBLE PRECISION,
                                   "otv_indirimi" DOUBLE PRECISION,
                                   "kdv" DOUBLE PRECISION,
                                   "fatura_toplam" DOUBLE PRECISION,
                                   "para_birimi" para_birimi,
                                   "gecikme_cezasi" VARCHAR(255),
                                   "kur" DOUBLE PRECISION,
                                   "fatura_try" DOUBLE PRECISION,
                                   "fatura_yukle" TEXT,
                                   "not" TEXT,
                                   "is_deleted" BOOLEAN DEFAULT FALSE,
                                   "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                                   "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_aracfilo" (
                               "id" character varying PRIMARY KEY,
                               "plaka" VARCHAR(255),
                               "marka_id" character varying,
                               "model_id" character varying,
                               "model_yili" VARCHAR(255),
                               "arac_tipi" VARCHAR(255),
                               "segment" VARCHAR(255),
                               "motor_no" VARCHAR(255),
                               "sasi_no" VARCHAR(255),
                               "renk" VARCHAR(255),
                               "kasa_tipi" VARCHAR(255),
                               "lastik_tipi" VARCHAR(255),
                               "filoya_giris_tarihi" TIMESTAMPTZ,
                               "filoya_giris_km" VARCHAR(255),
                               "tescil_tarihi" TIMESTAMPTZ,
                               "trafige_cikis_tarihi" TIMESTAMPTZ,
                               "garantisi_var_mi" BOOLEAN,
                               "garanti_bitis_tarihi" TIMESTAMPTZ,
                               "garanti_suresi_yil" VARCHAR(255),
                               "garanti_km" VARCHAR(255),
                               "tramer" BOOLEAN,
                               "tramer_tutari" DOUBLE PRECISION,
                               "son_km_tarihi" TIMESTAMPTZ,
                               "son_km" VARCHAR(255),
                               "son_yakit_miktari" VARCHAR(255),
                               "kiralandi_mi" BOOLEAN,
                               "kiralandigi_tarih" TIMESTAMPTZ,
                               "kontrat_suresi" VARCHAR(255),
                               "kiralik_bitis_tarihi" TIMESTAMPTZ,
                               "kiralayan_firma_id" character varying,
                               "filo_durum" INTEGER,
                               "is_deleted" BOOLEAN DEFAULT FALSE,
                               "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                               "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_arackullanan" (
                                   "id" character varying PRIMARY KEY,
                                   "ad" VARCHAR(255),
                                   "soyad" VARCHAR(255),
                                   "email" VARCHAR(255),
                                   "telefon_no" VARCHAR(255),
                                   "adres" TEXT,
                                   "ehliyet_no" VARCHAR(255),
                                   "ehliyet_tipi" ehliyet_tipi,
                                   "ehliyet_on" TEXT,
                                   "ehliyet_arka" TEXT,
                                   "ehliyet_bitis_tarihi" TIMESTAMPTZ,
                                   "cinsiyet_tipi" cinsiyet,
                                   "firma_id" character varying,
                                   "is_deleted" BOOLEAN DEFAULT FALSE,
                                   "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                                   "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_bakim" (
                            "id" character varying PRIMARY KEY,
                            "arac_filo_id" character varying,
                            "bakim_nedeni" bakim_nedeni,
                            "parca" VARCHAR(255),
                            "parca_tutari" DOUBLE PRECISION,
                            "iscilik_tutari" DOUBLE PRECISION,
                            "toplam_tutar" DOUBLE PRECISION,
                            "fatura_no" VARCHAR(255),
                            "fatura" TEXT,
                            "notlar" TEXT,
                            "odeyen_firma_id" character varying,
                            "is_deleted" BOOLEAN DEFAULT FALSE,
                            "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                            "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_filodancikis" (
                                   "id" character varying PRIMARY KEY,
                                   "arac_filo_id" character varying,
                                   "filodan_cikis_nedeni" filodan_cikis_nedeni,
                                   "filodan_cikis_tarihi" TIMESTAMPTZ,
                                   "alici" VARCHAR(255),
                                   "anahtar_teslim_fiyati" DOUBLE PRECISION,
                                   "arac_devir_giderleri" DOUBLE PRECISION,
                                   "fatura_yukle" TEXT,
                                   "not" TEXT,
                                   "is_deleted" BOOLEAN DEFAULT FALSE,
                                   "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                                   "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_hasar" (
                            "id" character varying PRIMARY KEY,
                            "arac_filo_id" character varying,
                            "hasarli_parca" hasarli_parca,
                            "hasar_tipi" hasar_tipi,
                            "is_deleted" BOOLEAN DEFAULT FALSE,
                            "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                            "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_iletisim" (
                               "id" character varying PRIMARY KEY,
                               "numara" VARCHAR(255),
                               "tip" iletisim_tipi,
                               "firma_id" character varying,
                               "is_deleted" BOOLEAN DEFAULT FALSE,
                               "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                               "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_kaza" (
                           "id" character varying PRIMARY KEY,
                           "arac_filo_id" character varying,
                           "firma_id" character varying,
                           "musteri_id" character varying,
                           "kaza_tarihi" TIMESTAMPTZ,
                           "kaza_ili" VARCHAR(255),
                           "kaza_nedeni" VARCHAR(255),
                           "kaza_tutanagi" TEXT,
                           "onarim_durumu" onarim_durumu,
                           "odeyen_firma_id" character varying,
                           "odendi" BOOLEAN DEFAULT FALSE,
                           "is_deleted" BOOLEAN DEFAULT FALSE,
                           "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                           "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_marka" (
                            "id" character varying PRIMARY KEY,
                            "ad" VARCHAR(255),
                            "is_deleted" BOOLEAN DEFAULT FALSE,
                            "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                            "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_model" (
                            "id" character varying PRIMARY KEY,
                            "ad" VARCHAR(255),
                            "marka_id" character varying,
                            "is_deleted" BOOLEAN DEFAULT FALSE,
                            "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                            "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_mtv" (
                           "id" character varying PRIMARY KEY,
                           "arac_filo_id" character varying,
                           "yil" CHAR(4),
                           "taksit" CHAR(2),
                           "makbuz_no" VARCHAR(255),
                           "miktar" DOUBLE PRECISION,
                           "odeme_tipi" odeme_tipi,
                           "odeyen_firma_id" character varying,
                           "aciklama" TEXT,
                           "gecikme_cezasi" VARCHAR(255),
                           "odendi" BOOLEAN DEFAULT FALSE,
                           "is_deleted" BOOLEAN DEFAULT FALSE,
                           "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                           "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_sigorta" (
                          "id" character varying PRIMARY KEY,
                          "arac_filo_id" character varying,
                          "acente" VARCHAR(255),
                          "sigorta_sirketi" VARCHAR(255),
                          "tip" sigorta_tipi,
                          "baslangic_tarihi" TIMESTAMPTZ,
                          "bitis_tarihi" TIMESTAMPTZ,
                          "police_no" VARCHAR(255),
                          "is_deleted" BOOLEAN DEFAULT FALSE,
                          "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                          "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tb_muayene" (
                              "id" character varying PRIMARY KEY,
                              "arac_filo_id" character varying,
                              "yeri" VARCHAR(255),
                              "tip" muayene_tipi,
                              "baslangic_tarihi" TIMESTAMPTZ,
                              "bitis_tarihi" TIMESTAMPTZ,
                              "makbuz_no" VARCHAR(255),
                              "gecikme_cezasi" VARCHAR(255),
                              "aciklama" TEXT,
                              "odeyen_firma_id" character varying,
                              "odendi" BOOLEAN DEFAULT FALSE,
                              "is_deleted" BOOLEAN DEFAULT FALSE,
                              "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                              "updated_at" TIMESTAMPTZ
);

-- Foreign key constraints eklemeleri:

ALTER TABLE "tb_adres"
    ADD CONSTRAINT fk_adres_firma FOREIGN KEY ("firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_alisfaturasi"
    ADD CONSTRAINT fk_alisfaturasi_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_alisfaturasi"
    ADD CONSTRAINT fk_alisfaturasi_satici_firma FOREIGN KEY ("satici_firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_aracfilo"
    ADD CONSTRAINT fk_aracfilo_marka FOREIGN KEY ("marka_id") REFERENCES "tb_marka" ("id");

ALTER TABLE "tb_aracfilo"
    ADD CONSTRAINT fk_aracfilo_model FOREIGN KEY ("model_id") REFERENCES "tb_model" ("id");

ALTER TABLE "tb_aracfilo"
    ADD CONSTRAINT fk_aracfilo_kiralayan_firma FOREIGN KEY ("kiralayan_firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_arackullanan"
    ADD CONSTRAINT fk_arackullanan_firma FOREIGN KEY ("firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_bakim"
    ADD CONSTRAINT fk_bakim_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_bakim"
    ADD CONSTRAINT fk_bakim_odeyen_firma FOREIGN KEY ("odeyen_firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_filodancikis"
    ADD CONSTRAINT fk_filodancikis_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_hasar"
    ADD CONSTRAINT fk_hasar_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_iletisim"
    ADD CONSTRAINT fk_iletisim_firma FOREIGN KEY ("firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_kaza"
    ADD CONSTRAINT fk_kaza_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_kaza"
    ADD CONSTRAINT fk_kaza_firma FOREIGN KEY ("firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_kaza"
    ADD CONSTRAINT fk_kaza_musteri FOREIGN KEY ("musteri_id") REFERENCES "tb_arackullanan" ("id");

ALTER TABLE "tb_kaza"
    ADD CONSTRAINT fk_kaza_odeyen_firma FOREIGN KEY ("odeyen_firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_model"
    ADD CONSTRAINT fk_model_marka FOREIGN KEY ("marka_id") REFERENCES "tb_marka" ("id");

ALTER TABLE "tb_mtv"
    ADD CONSTRAINT fk_mtv_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_mtv"
    ADD CONSTRAINT fk_mtv_firma FOREIGN KEY ("odeyen_firma_id") REFERENCES "tb_firma" ("id");

ALTER TABLE "tb_sigorta"
    ADD CONSTRAINT fk_sigorta_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_muayene"
    ADD CONSTRAINT fk_muayene_arac FOREIGN KEY ("arac_filo_id") REFERENCES "tb_aracfilo" ("id");

ALTER TABLE "tb_muayene"
    ADD CONSTRAINT fk_muayene_firma FOREIGN KEY ("odeyen_firma_id") REFERENCES "tb_firma" ("id");
