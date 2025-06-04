package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.SigortaTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.time.LocalDateTime;

@Getter
@SuperBuilder(toBuilder = true)
public class SigortaKasko extends AbstractAggregateModel<SigortaId> {

    private AracFiloId aracFiloId;
    private SigortaTipi tip;
    private String sigortaSirketi;
    private String acente;
    private String policeNo;
    private LocalDateTime baslangicTarihi;
    private LocalDateTime bitisTarihi;

    public void initIdGenerator() {
        super.setId(new SigortaId(IdFactory.create()));
    }

    public void updateFrom(SigortaKasko other) {
        this.aracFiloId = other.aracFiloId;
        this.tip = other.tip;
        this.sigortaSirketi = other.sigortaSirketi;
        this.acente = other.acente;
        this.policeNo = other.policeNo;
        this.baslangicTarihi = other.baslangicTarihi;
        this.bitisTarihi = other.bitisTarihi;
    }
}
