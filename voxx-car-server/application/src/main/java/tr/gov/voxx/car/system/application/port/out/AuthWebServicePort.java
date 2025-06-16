package tr.gov.voxx.car.system.application.port.out;

import tr.gov.voxx.car.system.application.dto.webservice.AuthWebServiceDto;
import tr.gov.voxx.car.system.application.dto.webservice.UserInfoDto;

public interface AuthWebServicePort {
    AuthWebServiceDto login(String username, String password);

    UserInfoDto userInfo(String authorizationHeader);
}
