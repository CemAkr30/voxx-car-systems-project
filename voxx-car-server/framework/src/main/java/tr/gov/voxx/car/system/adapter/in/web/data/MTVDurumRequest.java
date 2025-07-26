package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "MTV Durumu Sorgulama Request")
public class MTVDurumRequest {

    @NotBlank(message = "Yıl alanı boş olamaz")
    @Schema(description = "MTV yılı", example = "2024")
    private String yil;

    @NotBlank(message = "Taksit alanı boş olamaz")
    @Schema(description = "MTV taksiti", example = "1")
    private String taksit;

    @NotNull(message = "Ödendi alanı boş olamaz")
    @Schema(description = "Ödeme durumu", example = "false")
    private Boolean odendi;
} 