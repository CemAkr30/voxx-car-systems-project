package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MuayeneMapper;
import tr.gov.voxx.car.system.application.port.in.MuayeneApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.MuayeneApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Muayene;
import tr.gov.voxx.car.system.domain.valueobject.MuayeneId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.MUAYENE_ENDPOINT_V1;

@RestController
@RequestMapping(value = MUAYENE_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Muayene API", description = "Muayene CRUD işlemleri")
public class MuayeneControllerAdapter {

    private final MuayeneApplicationCommandPort muayeneApplicationCommandPort;
    private final MuayeneApplicationQueryPort muayeneApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Muayene Getir", description = "ID’ye göre Muayene verisini döner")
    public ResponseEntity<MuayeneResponse> get(@PathVariable String id) {
        Muayene muayene = muayeneApplicationQueryPort.get(new MuayeneId(id));
        return ResponseEntity.ok(MuayeneMapper.toResponse(muayene));
    }

    @GetMapping
    @Operation(summary = "Tüm Muayene", description = "Tüm Muayene listesini getirir")
    public ResponseEntity<List<MuayeneResponse>> getAll() {
        List<Muayene> muayeneList = muayeneApplicationQueryPort.getAll();
        return ResponseEntity.ok(MuayeneMapper.toResponseList(muayeneList));
    }

    @PostMapping
    @Operation(summary = "muayene Oluştur", description = "Yeni bir muayene oluşturur")
    public ResponseEntity<Void> create(@RequestBody MuayeneRequest request) {
        Muayene muayene = MuayeneMapper.toMuayene(request);
        muayeneApplicationCommandPort.post(muayene);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Muayene Güncelle", description = "Muayene bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody MuayeneRequest request) {
        Muayene muayene = MuayeneMapper.toMuayene(request);
        muayene.setId(new MuayeneId(id));
        muayeneApplicationCommandPort.put(muayene);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Muayene Sil", description = "Belirtilen ID ile Muayene siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        muayeneApplicationCommandPort.deleteById(new MuayeneId(id));
        return ResponseEntity.noContent().build();
    }
}

