package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.SigortaTipi;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.io.Serializable;
import java.time.LocalDateTime;

@Builder
@Data
public class SigortaCreatedEvent implements Serializable {
    private final SigortaId id;
    private final AracFiloId aracFiloId;
    private final SigortaTipi tip;
    private final String sigortaSirketi;
    private final String acente;
    private final String policeNo;
    private final LocalDateTime baslangicTarihi;
    private final LocalDateTime bitisTarihi;
}
