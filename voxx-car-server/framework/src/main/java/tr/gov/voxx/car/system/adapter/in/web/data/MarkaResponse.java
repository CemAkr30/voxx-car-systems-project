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
public class MarkaResponse {
    private String id;
    private String adi;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
