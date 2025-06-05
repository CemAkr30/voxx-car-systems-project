package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.HasarRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.HasarResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.HasarMapper;
import tr.gov.voxx.car.system.application.port.in.HasarApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.HasarApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Hasar;
import tr.gov.voxx.car.system.domain.valueobject.HasarId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.HASAR_ENDPOINT_V1;

@RestController
@RequestMapping(value = HASAR_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Hasar API", description = "Hasar CRUD işlemleri")
public class HasarControllerAdapter {
    private final HasarApplicationCommandPort hasarApplicationCommandPort;
    private final HasarApplicationQueryPort hasarApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Hasar Getir", description = "ID’ye göre hasar verisini döner")
    public ResponseEntity<HasarResponse> get(@PathVariable String id) {
        Hasar hasar = hasarApplicationQueryPort.get(new HasarId(id));
        return ResponseEntity.ok(HasarMapper.toResponse(hasar));
    }

    @GetMapping
    @Operation(summary = "Tüm Hasarlar", description = "Tüm Hasar listesini getirir")
    public ResponseEntity<List<HasarResponse>> getAll() {
        List<Hasar> hasarList = hasarApplicationQueryPort.getAll();
        return ResponseEntity.ok(HasarMapper.toResponseList(hasarList));
    }

    @PostMapping
    @Operation(summary = "Hasar Oluştur", description = "Yeni bir Hasar oluşturur")
    public ResponseEntity<Void> create(@RequestBody HasarRequest request) {
        Hasar hasar = HasarMapper.toHasar(request);
        hasarApplicationCommandPort.post(hasar);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Hasar Güncelle", description = "Hasar bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody HasarRequest request) {
        Hasar hasar = HasarMapper.toHasar(request);
        hasar.setId(new HasarId(id));
        hasarApplicationCommandPort.put(hasar);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Hasar Sil", description = "Belirtilen ID ile Hasar siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        hasarApplicationCommandPort.deleteById(new HasarId(id));
        return ResponseEntity.noContent().build();
    }
}

