package tr.gov.voxx.car.system.entity;

import lombok.Getter;
import tr.gov.voxx.car.system.enums.Cinsiyet;
import tr.gov.voxx.car.system.enums.EhliyetTipi;
import tr.gov.voxx.car.system.valueobject.FirmaId;
import tr.gov.voxx.car.system.valueobject.MusteriId;

@Getter
public class Musteri extends AbstractAggregateModel<MusteriId> {
    private String ad;
    private String soyad;
    private String email;
    private String telefonNumarasi;
    private String adres;
    private String ehliyetNo;
    private EhliyetTipi ehliyetTipi;
    private String ehliyetFotografOn;
    private String ehliyetFotografArka;
    private String ehliyetBitisTarihi;
    private Cinsiyet cinsiyet;
    private FirmaId firmaId;
}