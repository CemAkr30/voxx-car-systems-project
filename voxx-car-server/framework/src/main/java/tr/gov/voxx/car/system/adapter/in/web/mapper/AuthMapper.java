package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.LoginResponse;
import tr.gov.voxx.car.system.application.dto.webservice.AuthWebServiceDto;

@UtilityClass
public class AuthMapper {

    public static LoginResponse toLoginResponse(AuthWebServiceDto dto) {
        return LoginResponse.builder()
                .accessToken(dto.getAccessToken())
                .build();
    }
}
