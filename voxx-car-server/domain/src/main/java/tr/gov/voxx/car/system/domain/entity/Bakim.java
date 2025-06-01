package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

import java.time.LocalDateTime;

@Getter
@SuperBuilder(toBuilder = true)
public class Bakim extends AbstractAggregateModel<BakimId> {

    private String aracId;
    private String bakimNedeni;
    private String parca;
    private Double parcaTutari;
    private Double iscilikTutari;
    private Double toplamTutar;
    private String faturaNo;
    private String fatura;
    private String notlar;
    private String odeyenFirmaId;

    private Boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void initIdGenerator() {
        this.setId(new BakimId(IdFactory.create()));
    }

    public void updateFrom(Bakim other) {
        this.aracId = other.aracId;
        this.bakimNedeni = other.bakimNedeni;
        this.parca = other.parca;
        this.parcaTutari = other.parcaTutari;
        this.iscilikTutari = other.iscilikTutari;
        this.toplamTutar = other.toplamTutar;
        this.faturaNo = other.faturaNo;
        this.fatura = other.fatura;
        this.notlar = other.notlar;
        this.odeyenFirmaId = other.odeyenFirmaId;
        this.isDeleted = other.isDeleted;
        this.updatedAt = other.updatedAt;
    }
}
