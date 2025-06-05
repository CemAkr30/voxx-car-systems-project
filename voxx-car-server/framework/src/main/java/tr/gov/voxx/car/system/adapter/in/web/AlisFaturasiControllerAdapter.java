package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.AlisFaturasiRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AlisFaturasiResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.AlisFaturasiMapper;
import tr.gov.voxx.car.system.application.port.in.AlisFaturasiApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.AlisFaturasiApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.AlisFaturasi;
import tr.gov.voxx.car.system.domain.valueobject.AlisFaturasiId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.ALISFATURASI_ENDPOINT_V1;

@RestController
@RequestMapping(value = ALISFATURASI_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "AlisFaturasi API", description = "AlisFaturasi CRUD işlemleri")
public class AlisFaturasiControllerAdapter {
    
    private final AlisFaturasiApplicationCommandPort applicationCommandPort;
    private final AlisFaturasiApplicationQueryPort applicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "AlisFaturasi Getir", description = "ID’ye göre AlisFaturasi verisini döner")
    public ResponseEntity<AlisFaturasiResponse> get(@PathVariable String id) {
        AlisFaturasi alisFaturasi = applicationQueryPort.get(new AlisFaturasiId(id));
        return ResponseEntity.ok(AlisFaturasiMapper.toResponse(alisFaturasi));
    }

    @GetMapping
    @Operation(summary = "Tüm AlisFaturasi", description = "Tüm AlisFaturasi listesini getirir")
    public ResponseEntity<List<AlisFaturasiResponse>> getAll() {
        List<AlisFaturasi> alisFaturasiList = applicationQueryPort.getAll();
        return ResponseEntity.ok(AlisFaturasiMapper.toResponseList(alisFaturasiList));
    }

    @PostMapping
    @Operation(summary = "AlisFaturasi Oluştur", description = "Yeni bir AlisFaturasi oluşturur")
    public ResponseEntity<Void> create(@RequestBody AlisFaturasiRequest request) {
        AlisFaturasi alisFaturasi = AlisFaturasiMapper.toAlisFaturasi(request);
        applicationCommandPort.post(alisFaturasi);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "AlisFaturasi Güncelle", description = "AlisFaturasi bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody AlisFaturasiRequest request) {
        AlisFaturasi alisFaturasi = AlisFaturasiMapper.toAlisFaturasi(request);
        alisFaturasi.setId(new AlisFaturasiId(id));
        applicationCommandPort.put(alisFaturasi);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "AlisFaturasi Sil", description = "Belirtilen ID ile AlisFaturasi siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        applicationCommandPort.deleteById(new AlisFaturasiId(id));
        return ResponseEntity.noContent().build();
    }
}
