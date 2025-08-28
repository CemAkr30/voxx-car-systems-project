package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

@Getter
@SuperBuilder(toBuilder = true)
public class Mtv extends AbstractAggregateModel<MtvId> {

    private AracFiloId aracFiloId;
    private String yil;
    private String taksit;
    private String makbuzNo;
    private Double miktar;
    private OdemeTipi odemeTipi;
    private FirmaId odeyenFirmaId;
    private String aciklama;
    private String gecikmeCezasi;
    private Boolean odendi;


    public void initIdGenerator() {
        super.setId(new MtvId(IdFactory.create()));
    }

    public void updateFrom(Mtv other) {
        this.aracFiloId = other.aracFiloId;
        this.yil = other.yil;
        this.taksit = other.taksit;
        this.makbuzNo = other.makbuzNo;
        this.miktar = other.miktar;
        this.odemeTipi = other.odemeTipi;
        this.odeyenFirmaId = other.odeyenFirmaId;
        this.aciklama = other.aciklama;
        this.gecikmeCezasi = other.gecikmeCezasi;
        this.odendi = other.odendi;
    }
}

