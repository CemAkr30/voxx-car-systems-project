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
public class BakimResponse {
    private String id;
    private String aracFiloId;
    private String bakimNedeni;
    private String parca;
    private Double parcaTutari;
    private Double iscilikTutari;
    private Double toplamTutar;
    private String faturaNo;
    private String fatura;
    private String notlar;
    private String odeyenFirmaId;
    private Instant createdAt;
    private Instant updatedAt;
}
