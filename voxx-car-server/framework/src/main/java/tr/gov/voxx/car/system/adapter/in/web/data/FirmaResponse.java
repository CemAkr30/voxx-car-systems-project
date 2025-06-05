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
public class FirmaResponse {
    private String id;
    private String email;
    private String unvan;
    private String vergiNo;
    private Instant createdAt;
    private Instant updatedAt;
}
