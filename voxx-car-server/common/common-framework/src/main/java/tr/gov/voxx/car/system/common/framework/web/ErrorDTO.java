package tr.gov.voxx.car.system.common.framework.web;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorDTO {
    private final String code;
    private final String message;
    private final LocalDateTime timestamp;
}
