package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.enumeration.HasarliParca;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HasarRequest {
    private String aracFiloId;
    private HasarliParca hasarliParca;
    private Hasar hasar;
}