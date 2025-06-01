package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

@Data
@Builder
public class BakimUpdatedEvent {
    private final BakimId id;
    private final AracFiloId aracFiloId;
    private final String bakimNedeni;
    private final String parca;
    private final Double parcaTutari;
    private final Double iscilikTutari;
    private final Double toplamTutar;
    private final String faturaNo;
    private final String fatura;//Buna bak
    private final String notlar;
    private final FirmaId odeyenFirmaId;
}
