package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.FilodanCikisNedeni;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilodanCikisRequest {
    private String aracFiloId;
    private FilodanCikisNedeni filodanCikisNedeni;
    private Instant filodanCikisTarihi;
    private String alici;
    private Double anahtarTeslimFiyati;
    private Double aracDevirGiderleri;
    private String faturaYukle;
    private String not;
}
