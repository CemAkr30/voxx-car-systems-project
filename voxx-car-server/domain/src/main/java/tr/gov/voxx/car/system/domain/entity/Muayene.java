package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.MuayeneTipi;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.time.LocalDateTime;

@Getter
@SuperBuilder(toBuilder = true)
public class Muayene extends AbstractAggregateModel<MuayeneId> {

    private AracFiloId aracFiloId;
    private MuayeneTipi muayeneTipi;
    private String makbuzNo;
    private FirmaId odeyenFirmaId;
    private LocalDateTime baslangicTarihi;
    private LocalDateTime bitisTarihi;
    private String gecikmeCezasi;
    private String not;
    private String yeri;
    private Double miktar;//yeni eklendi
    private OdemeTipi odemeTipi;
    private Boolean odendi;


    public void initIdGenerator() {
        super.setId(new MuayeneId(IdFactory.create()));
    }

    public void updateFrom(Muayene other) {
        this.aracFiloId = other.aracFiloId;
        this.muayeneTipi = other.muayeneTipi;
        this.makbuzNo = other.makbuzNo;
        this.odeyenFirmaId = other.odeyenFirmaId;
        this.baslangicTarihi = other.baslangicTarihi;
        this.bitisTarihi = other.bitisTarihi;
        this.not = other.not;
        this.yeri = other.yeri;
        this.gecikmeCezasi = other.gecikmeCezasi;
        this.miktar = other.miktar;
        this.odemeTipi = other.odemeTipi;//yeni eklendi
        this.odendi = other.odendi;
    }
}


