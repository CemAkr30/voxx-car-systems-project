package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.dto.webservice.AuthWebServiceDto;
import tr.gov.voxx.car.system.application.port.in.AuthApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AuthWebServicePort;

@Service
@RequiredArgsConstructor
public class KeycloakAuthCommandUseCase implements AuthApplicationCommandPort {

    private final AuthWebServicePort authWebServicePort;

    @Override
    public AuthWebServiceDto login(String username, String password) {
        return authWebServicePort.login(username, password);
    }
}
