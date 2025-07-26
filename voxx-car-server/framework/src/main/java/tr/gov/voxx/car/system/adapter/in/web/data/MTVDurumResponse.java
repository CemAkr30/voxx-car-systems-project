package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "MTV Durumu Response")
public class MTVDurumResponse {

    @Schema(description = "Toplam kayıt sayısı")
    private Long toplamKayit;

    @Schema(description = "Toplam tutar")
    private Double toplamTutar;

    @Schema(description = "MTV listesi")
    private List<MTVDurumDetayResponse> mtvListesi;
} 