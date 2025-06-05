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
public class AracFiloRequest {
    private String plaka;
    private String markaId;
    private String modelId;
    private String modelYili;
    private String aracTipi;
    private String segment;
    private String motorNo;
    private String sasiNo;
    private String renk;
    private String kasaTipi;
    private String lastikTipi;
    private Instant filoyaGirisTarihi;
    private String filoyaGirisKm;
    private Instant tescilTarihi;
    private Instant trafigeCikisTarihi;
    private boolean garantisiVarMi;
    private Instant garantiBitisTarihi;
    private String garantiSuresiYil;
    private String garantiKm;
    private boolean tramer;
    private Double tramerTutari;
    private Instant sonKmTarihi;
    private String sonKm;
    private String sonYakitMiktari;
    private boolean kiralandiMi;
    private Instant kiralandigiTarih;
    private String kontratSuresi;
    private Instant kiralikBitisTarihi;
    private String kiralayanFirmaId;
    private Integer filoDurum;
}
