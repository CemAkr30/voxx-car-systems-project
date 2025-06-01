package tr.gov.voxx.car.system.domain.event;

import lombok.Builder;
import lombok.Data;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

@Data
@Builder
public class BakimUpdatedEvent {
    private final BakimId id;
    private final String aracId;
    private final String bakimNedeni;
    private final String parca;
    private final Double parcaTutari;
    private final Double iscilikTutari;
    private final Double toplamTutar;
    private final String faturaNo;
    private final String fatura;//Buna bak
    private final String notlar;
    private final String odeyenFirmaId;
}
