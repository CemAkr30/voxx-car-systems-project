package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.HasarTipi;
import tr.gov.voxx.car.system.domain.enumeration.HasarliParca;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HasarResponse {
    private String id;
    private String aracFiloId;
    private HasarliParca hasarliParca;
    private HasarTipi hasarTipi;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean isDeleted;
}
