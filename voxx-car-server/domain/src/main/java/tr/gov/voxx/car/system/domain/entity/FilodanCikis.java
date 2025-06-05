package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.FilodanCikisNedeni;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.time.Instant;

@Getter
@SuperBuilder(toBuilder = true)
public class FilodanCikis extends AbstractAggregateModel<FilodanCikisId> {

    private AracFiloId aracFiloId;
    private FilodanCikisNedeni filodanCikisNedeni;
    private Instant filodanCikisTarihi;
    private String alici;
    private Double anahtarTeslimFiyati;
    private Double aracDevirGiderleri;
    private String faturaYukle;
    private String not;

    public void initIdGenerator() {
        super.setId(new FilodanCikisId(IdFactory.create()));
    }

    public void updateFrom(FilodanCikis other) {
        this.aracFiloId = other.aracFiloId;
        this.filodanCikisNedeni = other.filodanCikisNedeni;
        this.filodanCikisTarihi = other.filodanCikisTarihi;
        this.alici = other.alici;
        this.anahtarTeslimFiyati = other.anahtarTeslimFiyati;
        this.aracDevirGiderleri = other.aracDevirGiderleri;
        this.faturaYukle = other.faturaYukle;
        this.not = other.not;

    }
}