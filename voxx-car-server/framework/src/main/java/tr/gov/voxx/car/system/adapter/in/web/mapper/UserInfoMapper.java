package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.UserInfoResponse;
import tr.gov.voxx.car.system.application.dto.webservice.UserInfoDto;

import java.util.List;

@UtilityClass
public class UserInfoMapper {

    public static UserInfoResponse toResponse(UserInfoDto userInfoDto) {
        return new UserInfoResponse(
                userInfoDto.userId(),
                userInfoDto.username(),
                userInfoDto.name(),
                userInfoDto.email(),
                userInfoDto.roles(),
                userInfoDto.sessionId(),
                userInfoDto.expirationTime()
        );
    }

    public static List<UserInfoResponse> toResponseList(List<UserInfoDto> userInfoDtos) {
        return userInfoDtos.stream()
                .map(UserInfoMapper::toResponse)
                .toList();
    }
}