package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Getter
@SuperBuilder(toBuilder = true)
public class Bakim extends AbstractAggregateModel<BakimId> {

    private AracFiloId aracFiloId;
    private String bakimNedeni;
    private String parca;
    private Double parcaTutari;
    private Double iscilikTutari;
    private Double toplamTutar;
    private String faturaNo;
    private String fatura;
    private String aciklama;
    private FirmaId odeyenFirmaId;


    public void initIdGenerator() {
        this.setId(new BakimId(IdFactory.create()));
    }

    public void updateFrom(Bakim other) {
        this.aracFiloId = other.aracFiloId;
        this.bakimNedeni = other.bakimNedeni;
        this.parca = other.parca;
        this.parcaTutari = other.parcaTutari;
        this.iscilikTutari = other.iscilikTutari;
        this.toplamTutar = other.toplamTutar;
        this.faturaNo = other.faturaNo;
        this.fatura = other.fatura;
        this.aciklama = other.aciklama;
        this.odeyenFirmaId = other.odeyenFirmaId;

    }
}
