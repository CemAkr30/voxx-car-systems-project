package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;

@Entity
@Table(name = "tb_bakim")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BakimEntity extends AbstractEntity {
    private String aracFiloId;
    private String bakimNedeni;
    private String parca;
    private Double parcaTutari;
    private Double iscilikTutari;
    private Double toplamTutar;
    private String faturaNo;
    @Lob
    private String fatura;
    private String notlar;
    private String odeyenFirmaId;
}
