package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.time.LocalDateTime;

@Getter
@SuperBuilder(toBuilder = true)
public class Kaza extends AbstractAggregateModel<KazaId> {

    private AracFiloId aracFiloId;
    private FirmaId firmaId;
    private String musteriId;//değişecek
    private LocalDateTime kazaTarihi;
    private String kazaIli;
    private String kazaNedeni;
    private String kazaTutanagi;
    private String onarimDurumu;
    private FirmaId odeyenFirmaId;

    public void initIdGenerator() {
        this.setId(new KazaId(IdFactory.create()));
    }

    public void updateFrom(Kaza other) {
        this.aracFiloId = other.aracFiloId;
        this.firmaId = other.firmaId;
        this.musteriId = other.musteriId;
        this.kazaTarihi = other.kazaTarihi;
        this.kazaIli = other.kazaIli;
        this.kazaNedeni = other.kazaNedeni;
        this.kazaTutanagi = other.kazaTutanagi;
        this.onarimDurumu = other.onarimDurumu;
        this.odeyenFirmaId = other.odeyenFirmaId;

    }
}
