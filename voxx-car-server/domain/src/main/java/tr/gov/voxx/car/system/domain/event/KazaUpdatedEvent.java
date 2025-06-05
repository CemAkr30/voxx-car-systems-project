package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.time.Instant;

@Data
@Builder
public class KazaUpdatedEvent {
    private final KazaId id;
    private final AracFiloId aracFiloId;
    private final FirmaId firmaId;
    private final String musteriId;
    private final Instant kazaTarihi;
    private final String kazaIli;
    private final String kazaNedeni;
    private final String kazaTutanagi;
    private final String onarimDurumu;
    private final FirmaId odeyenFirmaId;
}
