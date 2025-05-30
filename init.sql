CREATE TYPE ehliyetsinifi_enum AS ENUM ('A1', 'A2', 'A', 'B1', 'B', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'D', 'DE', 'F', 'G', 'M');
CREATE TYPE cinsiyet_enum AS ENUM ('Erkek', 'Kadın');
CREATE TYPE hasarliparca_enum AS ENUM ('Sağ Ön Tampon', 'Sol Ön Tampon', 'Ön Tampon', 'Kaput', 'Sağ Ön Kapı', 'Sağ Arka Kapı', 'Sol Ön Kapı', 'Sol Arka Kapı', 'Tavan', 'Arka Tampon', 'Bagaj Kapağı');
CREATE TYPE hasarturu_enum AS ENUM ('Orijinal', 'Lokal Boyalı', 'Boyalı', 'Değişen');
CREATE TYPE sigortakasko_enum AS ENUM ('Sigorta', 'Kasko');
CREATE TYPE odemetipi_enum AS ENUM ('AMERICAN_EXPRESS', 'NAKIT', 'BANKA_EFT', 'CARI_HESAP', 'BANKA_HAVALE', 'IKRAM', 'MASTERCARD', 'VOUCHER', 'VISA');
CREATE TYPE muayenetip_enum AS ENUM ('Egzos', 'Fenni');
CREATE TYPE parabirimleri_enum AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'TRY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR');
CREATE TYPE bakimnedeni_enum AS ENUM ('Yıllık', 'Hasar');
CREATE TYPE onarimdurumu_enum AS ENUM ('Servise Bekleniyor', 'Eksper Bekleniyor', 'Onarım Bekleniyor', 'Parça Bekleniyor', 'Kaportada', 'Boyada', 'Mekanikte', 'Teslime Hazır', 'Teslim Edildi');
CREATE TYPE filodancikisnedeni_enum AS ENUM ('Satış', 'Pert', 'Çalıntı', 'Galeri', 'Geçici', 'Plaka Değişikliği', 'Diğer');


CREATE TABLE "markalar" (
                            "id" integer PRIMARY KEY,
                            "marka" varchar,
                            "is_deleted" bool,
                            "created_at" timestamp,
                            "updated_at" timestamp
);

CREATE TABLE "modeller" (
                            "id" integer PRIMARY KEY,
                            "model" varchar,
                            "marka_id" integer NOT NULL,
                            "is_deleted" bool,
                            "created_at" timestamp,
                            "updated_at" timestamp
);

CREATE TABLE "firmalar" (
                            "id" integer PRIMARY KEY,
                            "email" varchar,
                            "unvan" varchar,
                            "vergi_no" varchar,
                            "is_deleted" bool,
                            "created_at" timestamp,
                            "updated_at" timestamp
);

CREATE TABLE "musteriler" (
                              "id" integer PRIMARY KEY,
                              "ad" varchar,
                              "soyad" varchar,
                              "email" varchar,
                              "telefon_numarasi" varchar,
                              "adres" varchar,
                              "ehliyet_no" varchar,
                              "ehliyet_tipi" ehliyetsinifi_enum,
                              "ehliyet_fotograf_on" text,
                              "ehliyet_fotograf_arka" text,
                              "ehliyet_bitis_tarihi" timestamp,
                              "cinsiyet" cinsiyet_enum,
                              "firma_id" integer NOT NULL,
                              "is_deleted" bool,
                              "created_at" timestamp,
                              "updated_at" timestamp
);

CREATE TABLE "iletisimler" (
                               "id" integer PRIMARY KEY,
                               "numara" varchar,
                               "tip" integer,
                               "firma_id" integer,
                               "is_deleted" bool,
                               "created_at" timestamp,
                               "updated_at" timestamp
);

CREATE TABLE "adresler" (
                            "id" integer PRIMARY KEY,
                            "aciklama" varchar,
                            "tip" integer,
                            "firma_id" integer,
                            "is_deleted" bool,
                            "created_at" timestamp,
                            "updated_at" timestamp
);

CREATE TABLE "arac_filo" (
                             "id" integer PRIMARY KEY,
                             "plaka" varchar,
                             "marka_id" integer NOT NULL,
                             "model_id" integer NOT NULL,
                             "model_yili" varchar,
                             "arac_tipi" varchar,
                             "segment" varchar,
                             "motor_no" varchar,
                             "sasi_no" varchar,
                             "renk" varchar,
                             "kasa_tipi" varchar,
                             "lastik_tipi" varchar,
                             "filoya_giris_tarihi" timestamp,
                             "filoya_giris_km" varchar,
                             "tescil_tarihi" timestamp,
                             "trafige_cikis_tarihi" timestamp,
                             "garantisi_var_mi" bool,
                             "garanti_bitis_tarihi" timestamp,
                             "garanti_suresi_yil" varchar,
                             "garanti_km" varchar,
                             "tramer" bool,
                             "tramer_tutari" double precision,
                             "son_km_tarihi" timestamp,
                             "son_km" varchar,
                             "son_yakit_miktari" varchar,
                             "kiralandi_mi" bool,
                             "kiralandigi_tarih" timestamp,
                             "kontrat_suresi" varchar,
                             "kiralik_bitis_tarihi" timestamp,
                             "kiralayan_firma_id" integer,
                             "filo_durum" integer,
                             "is_deleted" bool,
                             "created_at" timestamp,
                             "updated_at" timestamp
);

CREATE TABLE "hasar_durumu" (
                                "id" integer PRIMARY KEY,
                                "arac_id" integer NOT NULL,
                                "hasarli_parca" hasarliparca_enum,
                                "hasar" hasarturu_enum,
                                "is_deleted" bool,
                                "created_at" timestamp,
                                "updated_at" timestamp
);

CREATE TABLE "sigorta_kasko" (
                                 "id" integer PRIMARY KEY,
                                 "arac_id" integer NOT NULL,
                                 "sigorta_tipi" sigortakasko_enum,
                                 "sigorta_sirketi" varchar,
                                 "acente" varchar,
                                 "police_no" varchar,
                                 "baslangic_tarih" timestamp,
                                 "bitis_tarih" timestamp,
                                 "is_deleted" bool,
                                 "created_at" timestamp,
                                 "updated_at" timestamp
);

CREATE TABLE "mtv" (
                       "id" integer PRIMARY KEY,
                       "arac_id" integer NOT NULL,
                       "yil" varchar,
                       "taksit" varchar,
                       "makbuz_no" varchar,
                       "miktar" double precision,
                       "odeme_tip" odemetipi_enum,
                       "odeyen_firma_id" integer NOT NULL,
                       "not" varchar,
                       "gecikme_cezasi" varchar,
                       "odendi" bool,
                       "is_deleted" bool,
                       "created_at" timestamp,
                       "updated_at" timestamp
);

CREATE TABLE "muayene" (
                           "id" integer PRIMARY KEY,
                           "arac_id" integer NOT NULL,
                           "muayene_tip" muayenetip_enum,
                           "baslangic_tarih" timestamp,
                           "makbuz_no" varchar,
                           "bitis_tarih" timestamp,
                           "yeri" varchar,
                           "odeyen_firma_id" integer NOT NULL,
                           "not" varchar,
                           "gecikme_cezasi" varchar,
                           "odendi" bool,
                           "is_deleted" bool,
                           "created_at" timestamp,
                           "updated_at" timestamp
);

CREATE TABLE "filodan_cikis" (
                                 "id" integer PRIMARY KEY,
                                 "arac_id" integer NOT NULL,
                                 "filodan_cikis_nedeni" filodancikisnedeni_enum,
                                 "filodan_cikis_tarihi" timestamp,
                                 "alici" varchar,
                                 "anahtar_teslim_fiyati" integer,
                                 "arac_devir_giderleri" varchar,
                                 "fatura" text,
                                 "not" varchar,
                                 "is_deleted" bool,
                                 "created_at" timestamp,
                                 "updated_at" timestamp
);

CREATE TABLE "alis_faturasi" (
                                 "id" integer PRIMARY KEY,
                                 "arac_id" integer NOT NULL,
                                 "alis_fatura_tarihi" timestamp,
                                 "alis_fatura_no" varchar,
                                 "satici_firma_id" integer,
                                 "liste_fiyati" double precision,
                                 "ek_garanti" integer,
                                 "mal_degeri" double precision,
                                 "iskonto" double precision,
                                 "nakliye_bedeli" double precision,
                                 "otv_matrah" double precision,
                                 "otv" double precision,
                                 "otv_indirimi" double precision,
                                 "kdv" double precision,
                                 "fatura_toplam" double precision,
                                 "para_birimi" parabirimleri_enum,
                                 "kur" double precision,
                                 "fatura_try" double precision,
                                 "fatura_yukle" text,
                                 "not" varchar,
                                 "is_deleted" bool,
                                 "created_at" timestamp,
                                 "updated_at" timestamp
);

CREATE TABLE "bakim" (
                         "id" integer PRIMARY KEY,
                         "arac_id" integer NOT NULL,
                         "bakim_nedeni" bakimnedeni_enum,
                         "parca" varchar,
                         "parca_tutari" double precision,
                         "iscilik_tutari" double precision,
                         "toplam_tutar" double precision,
                         "fatura_no" varchar,
                         "fatura" text,
                         "not" varchar,
                         "odeyen_firma_id" integer NOT NULL,
                         "is_deleted" bool,
                         "created_at" timestamp,
                         "updated_at" timestamp
);

CREATE TABLE "kaza" (
                        "id" integer PRIMARY KEY,
                        "arac_id" integer NOT NULL,
                        "firma_id" integer NOT NULL,
                        "musteri_id" integer NOT NULL,
                        "kaza_tarihi" timestamp,
                        "kaza_ili" varchar,
                        "kaza_nedeni" varchar,
                        "kaza_tutanagi" text,
                        "onarim_durumu" onarimdurumu_enum,
                        "odeyen_firma_id" integer NOT NULL,
                        "is_deleted" bool,
                        "created_at" timestamp,
                        "updated_at" timestamp
);

ALTER TABLE "kaza" ADD CONSTRAINT "musteriler_kaza" FOREIGN KEY ("musteri_id") REFERENCES "musteriler" ("id");

ALTER TABLE "kaza" ADD CONSTRAINT "firmalar_kaza" FOREIGN KEY ("firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "kaza" ADD CONSTRAINT "firmalar_kaza" FOREIGN KEY ("odeyen_firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "kaza" ADD CONSTRAINT "aracfilo_kaza" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "bakim" ADD CONSTRAINT "firmalar_bakim" FOREIGN KEY ("odeyen_firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "bakim" ADD CONSTRAINT "aracfilo_bakim" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "musteriler" ADD CONSTRAINT "firmalar_musteriler" FOREIGN KEY ("firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "alis_faturasi" ADD CONSTRAINT "aracfilo_alisfaturasi" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "alis_faturasi" ADD CONSTRAINT "firmalar_alisfaturasi" FOREIGN KEY ("satici_firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "filodan_cikis" ADD CONSTRAINT "aracfilo_filodancikis" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "muayene" ADD CONSTRAINT "aracfilo_muayene" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "muayene" ADD CONSTRAINT "firmalar_muayene" FOREIGN KEY ("odeyen_firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "mtv" ADD CONSTRAINT "aracfilo_mtv" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "mtv" ADD CONSTRAINT "firmalar_mtv" FOREIGN KEY ("odeyen_firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "sigorta_kasko" ADD CONSTRAINT "aracfilo_sigortakasko" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "hasar_durumu" ADD CONSTRAINT "aracfilo_hasardurumu" FOREIGN KEY ("arac_id") REFERENCES "arac_filo" ("id");

ALTER TABLE "arac_filo" ADD CONSTRAINT "aracfilo_kiralayan_firmalar" FOREIGN KEY ("kiralayan_firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "arac_filo" ADD CONSTRAINT "aracfilo_markalar" FOREIGN KEY ("marka_id") REFERENCES "markalar" ("id");

ALTER TABLE "arac_filo" ADD CONSTRAINT "aracfilo_modeller" FOREIGN KEY ("model_id") REFERENCES "modeller" ("id");

ALTER TABLE "adresler" ADD CONSTRAINT "adresler_firmalar" FOREIGN KEY ("firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "iletisimler" ADD CONSTRAINT "iletisimler_firmalar" FOREIGN KEY ("firma_id") REFERENCES "firmalar" ("id");

ALTER TABLE "modeller" ADD CONSTRAINT "modeller_markalari" FOREIGN KEY ("marka_id") REFERENCES "markalar" ("id");
