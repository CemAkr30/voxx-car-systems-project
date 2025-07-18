package tr.gov.voxx.car.system.domain.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import tr.gov.voxx.car.system.common.domain.core.IdFactory;
import tr.gov.voxx.car.system.common.domain.entity.AbstractAggregateModel;
import tr.gov.voxx.car.system.domain.enumeration.ParaBirimi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.time.Instant;

@Getter
@SuperBuilder(toBuilder = true)
public class AlisFaturasi extends AbstractAggregateModel<AlisFaturasiId> {

    private AracFiloId aracFiloId;
    private Instant alisFaturasiTarihi;
    private String alisFaturaNo;
    private FirmaId saticiFirmaId;
    private Double listeFiyati;
    private Integer ekGaranti;
    private Double malDegeri;
    private Double iskonto;
    private Double nakliyeBedeli;
    private Double otvMatrah;
    private Double otv;
    private Double otvIndirimi;
    private Double kdv;
    private Double faturaToplam;
    private ParaBirimi paraBirimi;
    private String gecikmeCezasi;
    private Double kur;
    private Double faturaTry;
    private String faturaYukle;//dosya yolu mu verilecek
    private String aciklama;

    public void initIdGenerator() {
        super.setId(new AlisFaturasiId(IdFactory.create()));
    }

    public void updateFrom(AlisFaturasi other) {
        this.aracFiloId = other.aracFiloId;
        this.alisFaturasiTarihi = other.alisFaturasiTarihi;
        this.alisFaturaNo = other.alisFaturaNo;
        this.saticiFirmaId = other.saticiFirmaId;
        this.listeFiyati = other.listeFiyati;
        this.ekGaranti = other.ekGaranti;
        this.malDegeri = other.malDegeri;
        this.iskonto = other.iskonto;
        this.nakliyeBedeli = other.nakliyeBedeli;
        this.otvMatrah = other.otvMatrah;
        this.otv = other.otv;
        this.otvIndirimi = other.otvIndirimi;
        this.kdv = other.kdv;
        this.faturaToplam = other.faturaToplam;
        this.paraBirimi = other.paraBirimi;
        this.gecikmeCezasi = other.gecikmeCezasi;
        this.kur = other.kur;
        this.faturaTry = other.faturaTry;
        this.faturaYukle = other.faturaYukle;
        this.aciklama = other.aciklama;
    }
}
