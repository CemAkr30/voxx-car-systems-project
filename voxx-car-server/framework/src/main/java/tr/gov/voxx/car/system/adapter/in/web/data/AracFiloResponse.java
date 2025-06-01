package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AracFiloResponse {
    private String id;
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
    private LocalDateTime filoyaGirisTarihi;
    private String filoyaGirisKm;
    private LocalDateTime tescilTarihi;
    private LocalDateTime trafigeCikisTarihi;
    private boolean garantisiVarMi;
    private LocalDateTime garantiBitisTarihi;
    private String garantiSuresiYil;
    private String garantiKm;
    private boolean tramer;
    private Double tramerTutari;
    private LocalDateTime sonKmTarihi;
    private String sonKm;
    private String sonYakitMiktari;
    private boolean kiralandiMi;
    private LocalDateTime kiralandigiTarih;
    private String kontratSuresi;
    private LocalDateTime kiralikBitisTarihi;
    private String kiralayanFirmaId;
    private Integer filoDurum;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

