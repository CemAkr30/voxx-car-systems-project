package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.AdresTipi;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdresResponse {
    private String id;
    private String aciklama;
    private AdresTipi tip;
    private String firmaId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
