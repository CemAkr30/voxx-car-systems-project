package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KazaResponse {
    private String id;
    private String aracFiloId;
    private String firmaId;
    private String musteriId;//değişecek
    private Instant kazaTarihi;
    private String kazaIli;
    private String kazaNedeni;
    private String kazaTutanagi;
    private String onarimDurumu;
    private String odeyenFirmaId;
    private boolean isDeleted;
    private Instant createdAt;
    private Instant updatedAt;
}
