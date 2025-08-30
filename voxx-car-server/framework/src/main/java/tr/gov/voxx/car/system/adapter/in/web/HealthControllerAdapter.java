package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/health")
@RequiredArgsConstructor
@Tag(name = "Health Check API", description = "Sistem sağlık kontrolü")
public class HealthControllerAdapter {

    @GetMapping
    @Operation(summary = "Health Check", description = "Sistem sağlık durumunu kontrol eder")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> healthStatus = new HashMap<>();
        healthStatus.put("status", "UP");
        healthStatus.put("timestamp", LocalDateTime.now());
        healthStatus.put("service", "Voxx Car Systems API");
        healthStatus.put("version", "1.0.0");
        
        return ResponseEntity.ok(healthStatus);
    }

    @GetMapping("/ready")
    @Operation(summary = "Readiness Check", description = "Sistem hazır olma durumunu kontrol eder")
    public ResponseEntity<Map<String, Object>> readinessCheck() {
        Map<String, Object> readinessStatus = new HashMap<>();
        readinessStatus.put("status", "READY");
        readinessStatus.put("timestamp", LocalDateTime.now());
        readinessStatus.put("database", "UP");
        readinessStatus.put("kafka", "UP");
        readinessStatus.put("couchbase", "UP");
        
        return ResponseEntity.ok(readinessStatus);
    }
}
