package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.gov.voxx.car.system.adapter.in.web.data.LoginRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.LoginResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.AuthMapper;
import tr.gov.voxx.car.system.application.dto.webservice.AuthWebServiceDto;
import tr.gov.voxx.car.system.application.port.in.AuthApplicationCommandPort;

import static tr.gov.voxx.car.system.constants.EndpointPath.AUTH_ENDPOINT;

@RestController
@RequestMapping(value = AUTH_ENDPOINT)
@RequiredArgsConstructor
@Tag(name = "Auth API", description = "Authentication işlemleri")
public class AuthControllerAdapter {

    private final AuthApplicationCommandPort authApplicationCommandPort;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Kullanıcı adı ve şifre ile giriş yapar ve token döner")
    public ResponseEntity<LoginResponse> login(
            @RequestBody @Valid LoginRequest request) {
        AuthWebServiceDto response = authApplicationCommandPort.login(
                request.getUsername(), request.getPassword()
        );
        return ResponseEntity.ok(AuthMapper.toLoginResponse(response));
    }
}
