package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Muayene Durumu Response")
public class MuayeneDurumResponse {

    @Schema(description = "Toplam kayıt sayısı")
    private Long toplamKayit;

    @Schema(description = "Toplam tutar")
    private Double toplamTutar;

    @Schema(description = "Muayene listesi")
    private List<MuayeneDurumDetayResponse> muayeneListesi;
} 