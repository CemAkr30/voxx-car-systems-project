package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.time.Instant;

@Getter
@SuperBuilder(toBuilder = true)
public class AracFirmaDetay extends AbstractAggregateModel<AracFirmaDetayId> {
    private AracFiloId aracFiloId;
    private FirmaId firmaId;
    private Instant sozlesmeBaslangicTarihi;
    private Instant sozlesmeBitisTarihi;
    private String teslimatTutanagi;
    private String sozlesme;
    private Integer odemeVadesi;

    public void initIdGenerator() {
        this.setId(new AracFirmaDetayId(IdFactory.create()));
    }

    public void updateFrom(AracFirmaDetay other) {
        this.aracFiloId = other.getAracFiloId();
        this.firmaId = other.getFirmaId();
        this.sozlesmeBaslangicTarihi = other.getSozlesmeBaslangicTarihi();
        this.sozlesmeBitisTarihi = other.getSozlesmeBitisTarihi();
        this.teslimatTutanagi = other.getTeslimatTutanagi();
        this.sozlesme = other.getSozlesme();
        this.odemeVadesi = other.getOdemeVadesi();
    }
}
