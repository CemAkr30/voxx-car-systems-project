package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Sigorta Durumu Sorgulama Request")
public class SigortaDurumRequest {

    @NotNull(message = "Tarih alanı boş olamaz")
    @Schema(description = "Kontrol edilecek tarih", example = "2024-12-31")
    private LocalDate tarih;
} 