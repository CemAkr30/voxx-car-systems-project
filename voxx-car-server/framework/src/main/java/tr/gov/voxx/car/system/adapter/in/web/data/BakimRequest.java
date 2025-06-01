package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BakimRequest {
    private String aracId;
    private String bakimNedeni;
    private String parca;
    private Double parcaTutari;
    private Double iscilikTutari;
    private Double toplamTutar;
    private String faturaNo;
    private String fatura;
    private String notlar;
    private String odeyenFirmaId;
}
