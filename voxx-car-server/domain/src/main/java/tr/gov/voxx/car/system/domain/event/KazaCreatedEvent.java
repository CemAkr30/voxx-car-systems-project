package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.time.LocalDateTime;

@Data
@Builder
public class KazaCreatedEvent {
    private final KazaId id;
    private final AracFiloId aracId;
    private final FirmaId firmaId;
    private final String musteriId;//değişecek
    private final LocalDateTime kazaTarihi;
    private final String kazaIli;
    private final String kazaNedeni;
    private final String kazaTutanagi;
    private final String onarimDurumu;
    private final FirmaId odeyenFirmaId;
}
