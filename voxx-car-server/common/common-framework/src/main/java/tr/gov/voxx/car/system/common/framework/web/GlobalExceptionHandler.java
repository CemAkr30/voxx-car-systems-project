package tr.gov.voxx.car.system.common.framework.web;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tr.gov.voxx.car.system.common.domain.exception.DomainException;

import java.time.LocalDateTime;
import java.util.stream.Collectors;


@Slf4j
@RestControllerAdvice
@Component("globalExceptionHandlerWeb")
@Hidden
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handleGenericException(Exception exception) {
        log.error("Unhandled exception occurred", exception);
        return buildErrorDTO(ErrorCode.INTERNAL_ERROR, "Unexpected error occurred!");
    }

    @ResponseBody
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDTO handleValidationException(ValidationException exception) {
        if (exception instanceof ConstraintViolationException) {
            String message = extractViolations((ConstraintViolationException) exception);
            log.warn("Validation error: {}", message);
            return buildErrorDTO(ErrorCode.VALIDATION_ERROR, message);
        } else {
            log.warn("Validation error: {}", exception.getMessage());
            return buildErrorDTO(ErrorCode.VALIDATION_ERROR, exception.getMessage());
        }
    }

    @ResponseBody
    @ExceptionHandler(DomainException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDTO handleDomainException(DomainException exception) {
        log.warn("Domain error: {}", exception.getMessage());
        return buildErrorDTO(ErrorCode.DOMAIN_ERROR, exception.getMessage());
    }

    private ErrorDTO buildErrorDTO(ErrorCode code, String message) {
        return ErrorDTO.builder()
                .code(code.name())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    private String extractViolations(ConstraintViolationException exception) {
        return exception.getConstraintViolations().stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining("; "));
    }
}
