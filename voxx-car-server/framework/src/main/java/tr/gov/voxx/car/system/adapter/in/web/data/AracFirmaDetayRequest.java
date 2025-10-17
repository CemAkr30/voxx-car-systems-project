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
public class AracFirmaDetayRequest {
    private String aracFiloId;
    private String firmaId;
    private Instant sozlesmeBaslangicTarihi;
    private Instant sozlesmeBitisTarihi;
    private String teslimatTutanagi;
    private String sozlesme;
    private Integer odemeVadesi;
}
