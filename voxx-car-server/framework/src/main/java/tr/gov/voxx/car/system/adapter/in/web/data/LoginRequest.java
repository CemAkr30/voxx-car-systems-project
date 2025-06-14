package tr.gov.voxx.car.system.adapter.in.web.data;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {
    @NotBlank(message = "Kullanıcı adı boş olamaz")
    private String username;
    @NotBlank(message = "Şifre boş olamaz")
    private String password;
}
