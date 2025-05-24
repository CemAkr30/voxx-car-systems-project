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
                              "ehliyet_tipi" enum,
                              "ehliyet_fotograf_on" clob,
                              "ehliyet_fotograf_arka" clob,
                              "ehliyet_bitis_tarihi" timestamp,
                              "cinsiyet" enum,
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
                             "fenni_muayene_bitis_tarihi" timestamp,
                             "egsoz_muayene_bitis_tarihi" timestamp,
                             "sigorta_bitis_tarihi" timestamp,
                             "garantisi_var_mi" bool,
                             "garanti_bitis_tarihi" timestamp,
                             "garanti_suresi_yil" varchar,
                             "garanti_km" varchar,
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
                                "hasarli_parca" enum,
                                "hasar" enum,
                                "is_deleted" bool,
                                "created_at" timestamp,
                                "updated_at" timestamp
);

CREATE TABLE "sigorta_kasko" (
                                 "id" integer PRIMARY KEY,
                                 "arac_id" integer NOT NULL,
                                 "sigorta_tipi" enum,
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
                       "miktar" double,
                       "odeme_tip" enum,
                       "odeyen_firma_id" integer NOT NULL,
                       "not" varchar2,
                       "gecikme_cezasi" varchar,
                       "odendi" bool,
                       "is_deleted" bool,
                       "created_at" timestamp,
                       "updated_at" timestamp
);

CREATE TABLE "muayene" (
                           "id" integer PRIMARY KEY,
                           "arac_id" integer NOT NULL,
                           "muayene_tip" enum,
                           "baslangic_tarih" timestamp,
                           "makbuz_no" varchar,
                           "bitis_tarih" timestamp,
                           "yeri" varchar,
                           "odeyen_firma_id" integer NOT NULL,
                           "not" varchar2,
                           "gecikme_cezasi" varchar,
                           "odendi" bool,
                           "is_deleted" bool,
                           "created_at" timestamp,
                           "updated_at" timestamp
);

CREATE TABLE "filodan_cikis" (
                                 "id" integer PRIMARY KEY,
                                 "arac_id" integer NOT NULL,
                                 "filodan_cikis_nedeni" enum,
                                 "filodan_cikis_tarihi" timestamp,
                                 "alici" varchar,
                                 "anahtar_teslim_fiyati" integer,
                                 "arac_devir_giderleri" varchar,
                                 "fatura" clob,
                                 "not" varchar2,
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
                                 "liste_fiyati" double,
                                 "ek_garanti" integer,
                                 "mal_degeri" double,
                                 "iskonto" double,
                                 "nakliye_bedeli" double,
                                 "otv_matrah" double,
                                 "otv" double,
                                 "otv_indirimi" double,
                                 "kdv" double,
                                 "fatura_toplam" double,
                                 "para_birimi" enum,
                                 "kur" double,
                                 "fatura_try" double,
                                 "fatura_yukle" clob,
                                 "not" varchar2,
                                 "is_deleted" bool,
                                 "created_at" timestamp,
                                 "updated_at" timestamp
);

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
