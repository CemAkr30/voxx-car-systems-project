package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.application.dto.webservice.AuthWebServiceDto;

public interface AuthWebServicePort {
    AuthWebServiceDto login(String username, String password);
}
