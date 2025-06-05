package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.IletisimTipi;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IletisimResponse {
    private String id;
    private String numara;
    private IletisimTipi tip;
    private String firmaId;
    private Instant createdAt;
    private Instant updatedAt;
}
