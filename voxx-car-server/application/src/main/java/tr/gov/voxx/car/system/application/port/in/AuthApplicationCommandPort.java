package tr.gov.voxx.car.system.application.port.in;

import tr.gov.voxx.car.system.application.dto.webservice.AuthWebServiceDto;

public interface AuthApplicationCommandPort {
    AuthWebServiceDto login(String username, String password);
}
