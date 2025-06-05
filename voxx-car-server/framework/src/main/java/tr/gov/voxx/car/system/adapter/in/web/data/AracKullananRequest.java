package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.Cinsiyet;
import tr.gov.voxx.car.system.domain.enumeration.EhliyetTipi;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AracKullananRequest {
    private String ad;
    private String soyad;
    private String email;
    private String telefonNo;
    private String adres;
    private String ehliyetNo;
    private EhliyetTipi ehliyetTipi;
    private String ehliyetOn;
    private String ehliyetArka;
    private Instant ehliyetBitisTarihi;
    private Cinsiyet cinsiyetTipi;
    private String firmaId;
}

