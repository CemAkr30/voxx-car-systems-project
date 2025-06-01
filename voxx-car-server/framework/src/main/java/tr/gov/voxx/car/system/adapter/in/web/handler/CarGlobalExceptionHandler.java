package tr.gov.voxx.car.system.adapter.in.web.handler;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tr.gov.voxx.car.system.common.framework.web.ErrorCode;
import tr.gov.voxx.car.system.common.framework.web.ErrorDTO;
import tr.gov.voxx.car.system.common.framework.web.GlobalExceptionHandler;
import tr.gov.voxx.car.system.domain.exception.BusinessRuleException;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;

@Slf4j
@RestControllerAdvice
@Component("carGlobalExceptionHandlerWeb")
@Hidden
public class CarGlobalExceptionHandler extends GlobalExceptionHandler {


    @ResponseBody
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorDTO handleGenericException(NotFoundException exception) {
        log.error("Unhandled exception occurred", exception);
        return buildErrorDTO(ErrorCode.ENTITY_NOT_FOUND, "Unexpected error occurred!");
    }

    @ResponseBody
    @ExceptionHandler(BusinessRuleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDTO handleGenericException(BusinessRuleException exception) {
        log.error("Unhandled exception occurred", exception);
        return buildErrorDTO(ErrorCode.BUSINESS_RULE_ERROR, "Unexpected error occurred!");
    }

    @ResponseBody
    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorDTO handleGenericException(AuthorizationDeniedException exception) {
        log.error("Unhandled exception occurred", exception);
        return buildErrorDTO(ErrorCode.UNAUTHORIZED, "Unexpected error occurred!");
    }


}
