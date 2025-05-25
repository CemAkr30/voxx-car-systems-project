/*package tr.gov.voxx.car.system.container;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/v1/demo")
public class DemoController {

    @GetMapping("/admin")
    @PreAuthorize("hasRole('client_admin')")
    public ResponseEntity<String> adminDetails(){
        return ResponseEntity.ok("Hello Admin");
    }
    @GetMapping("/user")
    @PreAuthorize("hasRole('client_user')")
    public ResponseEntity<String> userDetails(){
        return ResponseEntity.ok("Hello User");
    }

    @GetMapping("/hello-everyone")
    @PreAuthorize("hasAnyRole('client_user', 'client_admin')")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello Everyone!");
    }
}*/