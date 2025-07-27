package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Sigorta Durumu Response")
public class SigortaDurumResponse {

    @Schema(description = "Toplam kayıt sayısı")
    private Long toplamKayit;

    @Schema(description = "Sigorta")
    private SigortaDurumDetayResponse sigorta;
} 