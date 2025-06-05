package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.AracKullananRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AracKullananResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.AracKullananMapper;
import tr.gov.voxx.car.system.application.port.in.AracKullananApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.AracKullananApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.AracKullanan;
import tr.gov.voxx.car.system.domain.valueobject.AracKullananId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.ARACKULLANAN_ENDPOINT_V1;

@RestController
@RequestMapping(value = ARACKULLANAN_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "AracKullanan API", description = "AracKullanan CRUD işlemleri")
public class AracKullananControllerAdapter {

    private final AracKullananApplicationCommandPort applicationCommandPort;
    private final AracKullananApplicationQueryPort applicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "AracKullanan Getir", description = "ID’ye göre AracKullanan verisini döner")
    public ResponseEntity<AracKullananResponse> get(@PathVariable String id) {
        AracKullanan aracKullanan = applicationQueryPort.get(new AracKullananId(id));
        return ResponseEntity.ok(AracKullananMapper.toResponse(aracKullanan));
    }

    @GetMapping
    @Operation(summary = "Tüm AracKullananler", description = "Tüm AracKullanan listesini getirir")
    public ResponseEntity<List<AracKullananResponse>> getAll() {
        List<AracKullanan> aracKullananList = applicationQueryPort.getAll();
        return ResponseEntity.ok(AracKullananMapper.toResponseList(aracKullananList));
    }

    @PostMapping
    @Operation(summary = "AracKullanan Oluştur", description = "Yeni bir AracKullanan oluşturur")
    public ResponseEntity<Void> create(@RequestBody AracKullananRequest request) {
        AracKullanan aracKullanan = AracKullananMapper.toAracKullanan(request);
        applicationCommandPort.post(aracKullanan);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "AracKullanan Güncelle", description = "AracKullanan bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody AracKullananRequest request) {
        AracKullanan aracKullanan = AracKullananMapper.toAracKullanan(request);
        aracKullanan.setId(new AracKullananId(id));
        applicationCommandPort.put(aracKullanan);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "AracKullanan Sil", description = "Belirtilen ID ile AracKullanan siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        applicationCommandPort.deleteById(new AracKullananId(id));
        return ResponseEntity.noContent().build();
    }
}

