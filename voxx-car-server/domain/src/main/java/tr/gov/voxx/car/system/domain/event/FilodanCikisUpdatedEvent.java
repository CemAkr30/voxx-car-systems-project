package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.enumeration.FilodanCikisNedeni;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.time.Instant;

@Data
@Builder
public class FilodanCikisUpdatedEvent {
    private final FilodanCikisId id;
    private final AracFiloId aracFiloId;
    private final FilodanCikisNedeni filodanCikisNedeni;
    private final Instant filodanCikisTarihi;
    private final String alici;
    private final Double anahtarTeslimFiyati;
    private final Double aracDevirGiderleri;
    private final String faturaYukle;
    private final String not;
}
