package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.AdresTipi;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdresRequest {
    private String aciklama;
    private AdresTipi tip;
    private String firmaId;
}
