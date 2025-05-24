package tr.gov.voxx.car.server;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ErrorDTO {
    private final String code;
    private final String message;
}
