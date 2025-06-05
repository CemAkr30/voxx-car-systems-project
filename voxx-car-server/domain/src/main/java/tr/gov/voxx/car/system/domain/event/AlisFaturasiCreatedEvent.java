package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.ParaBirimi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.io.Serializable;
import java.time.Instant;

@Builder
@Data
public class AlisFaturasiCreatedEvent implements Serializable {
    private final AlisFaturasiId id;
    private final AracFiloId aracFiloId;
    private final Instant alisFaturasiTarihi;
    private final String alisFaturaNo;
    private final FirmaId saticiFirmaId;
    private final Double listeFiyati;
    private final Integer ekGaranti;
    private final Double malDegeri;
    private final Double iskonto;
    private final Double nakliyeBedeli;
    private final Double otvMatrah;
    private final Double otv;
    private final Double otvIndirimi;
    private final Double kdv;
    private final Double faturaToplam;
    private final ParaBirimi paraBirimi;
    private final String gecikmeCezasi;
    private final Double kur;
    private final Double faturaTry;
    private final String faturaYukle;//dosya yolu mu verilecek
    private final String not;
}

