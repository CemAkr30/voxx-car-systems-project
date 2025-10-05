package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.KazaNedeni;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KazaResponse {
    private String id;
    private String aracFiloId;
    private String firmaId;
    private Instant kazaTarihi;
    private String kazaIli;
    private KazaNedeni kazaNedeni;
    private String kazaTutanagi;
    private String onarimDurumu;
    private String odeyenFirmaId;
    private boolean isDeleted;
    private Instant createdAt;
    private Instant updatedAt;
}
