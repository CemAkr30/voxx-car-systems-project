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
public class ModelResponse {
    private String id;
    private String adi;
    private String markaId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
