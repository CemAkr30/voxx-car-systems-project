package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFiloRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFiloResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.AracFiloMapper;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.ARAC_FILO_ENDPOINT_V1;

@RestController
@RequestMapping(value = ARAC_FILO_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Araç Filo API", description = "Filo araçları için CRUD işlemleri")
public class AracFiloControllerAdapter {

    private final AracFiloApplicationCommandPort commandPort;
    private final AracFiloApplicationQueryPort queryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Araç Getir", description = "ID’ye göre araç bilgisini getirir")
    public ResponseEntity<AracFiloResponse> get(@PathVariable String id) {
        AracFilo entity = queryPort.get(new AracFiloId(id));
        return ResponseEntity.ok(AracFiloMapper.toResponse(entity));
    }

    @GetMapping
    @Operation(summary = "Tüm Araçlar", description = "Tüm filo araç listesini getirir")
    public ResponseEntity<List<AracFiloResponse>> getAll() {
        return ResponseEntity.ok(AracFiloMapper.toResponseList(queryPort.getAll()));
    }

    @PostMapping
    @Operation(summary = "Araç Ekle", description = "Yeni bir filo aracı ekler")
    public ResponseEntity<Void> create(@RequestBody AracFiloRequest request) {
        commandPort.post(AracFiloMapper.toAracFilo(request));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Araç Güncelle", description = "Araç bilgilerini günceller")
    public ResponseEntity<Void> update(@PathVariable String id, @RequestBody AracFiloRequest request) {
        AracFilo entity = AracFiloMapper.toAracFilo(request);
        entity.setId(new AracFiloId(id));
        commandPort.put(entity);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Araç Sil", description = "Belirtilen ID ile aracı siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        commandPort.deleteById(new AracFiloId(id));
        return ResponseEntity.noContent().build();
    }
}
