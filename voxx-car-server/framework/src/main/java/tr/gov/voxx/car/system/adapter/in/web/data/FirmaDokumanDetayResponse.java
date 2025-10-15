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
public class FirmaDokumanDetayResponse {
    private String id;
    private String firmaId;
    private String sozlesme;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean isDeleted;
}
