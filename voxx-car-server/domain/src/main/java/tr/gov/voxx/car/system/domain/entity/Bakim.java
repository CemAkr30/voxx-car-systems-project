package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

@Getter
@SuperBuilder(toBuilder = true)
public class Bakim extends AbstractAggregateModel<BakimId> {

    private AracFiloId aracFiloId;
    private String bakimNedeni;
    private String parca;
    private Double parcaTutari;
    private Double iscilikTutari;
    private Double toplamTutar;
    private String fatura;
    private String aciklama;
    private String bakimOdeyenFirma;
    private String aracGuncelKm;
    private String bakimAraligi;
    private String parcaAdedi;

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
        this.fatura = other.fatura;
        this.aciklama = other.aciklama;
        this.bakimOdeyenFirma = other.bakimOdeyenFirma;
        this.aracGuncelKm = other.aracGuncelKm;
        this.bakimAraligi = other.bakimAraligi;
        this.parcaAdedi = other.parcaAdedi;
    }
}
