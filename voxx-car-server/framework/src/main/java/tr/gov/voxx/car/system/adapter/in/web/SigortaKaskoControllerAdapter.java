package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.SigortaKaskoRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.SigortaKaskoResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.SigortaKaskoMapper;
import tr.gov.voxx.car.system.application.port.in.SigortaKaskoApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.SigortaKaskoApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.SIGORTA_ENDPOINT_V1;

@RestController
@RequestMapping(value = SIGORTA_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Sigorta API", description = "Sigorta CRUD işlemleri")
public class SigortaKaskoControllerAdapter {
    private final SigortaKaskoApplicationCommandPort sigortaKaskoApplicationCommandPort;
    private final SigortaKaskoApplicationQueryPort sigortaKaskoApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Sigorta Getir", description = "ID’ye göre sigorta verisini döner")
    public ResponseEntity<SigortaKaskoResponse> get(@PathVariable String id) {
        SigortaKasko sigorta = sigortaKaskoApplicationQueryPort.get(new SigortaId(id));
        return ResponseEntity.ok(SigortaKaskoMapper.toResponse(sigorta));
    }

    @GetMapping
    @Operation(summary = "Tüm Sigortalar", description = "Tüm Sigortalar listesini getirir")
    public ResponseEntity<List<SigortaKaskoResponse>> getAll() {
        List<SigortaKasko> sigortaList = sigortaKaskoApplicationQueryPort.getAll();
        return ResponseEntity.ok(SigortaKaskoMapper.toResponseList(sigortaList));
    }

    @PostMapping
    @Operation(summary = "Sigorta Oluştur", description = "Yeni bir Sigorta oluşturur")
    public ResponseEntity<Void> create(@RequestBody SigortaKaskoRequest request) {
        SigortaKasko sigorta = SigortaKaskoMapper.toSigortaKasko(request);
        sigortaKaskoApplicationCommandPort.post(sigorta);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Sigorta Güncelle", description = "Sigorta bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody SigortaKaskoRequest request) {
        SigortaKasko sigorta = SigortaKaskoMapper.toSigortaKasko(request);
        sigorta.setId(new SigortaId(id));
        sigortaKaskoApplicationCommandPort.put(sigorta);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Sigorta Sil", description = "Belirtilen ID ile Sigorta siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        sigortaKaskoApplicationCommandPort.deleteById(new SigortaId(id));
        return ResponseEntity.noContent().build();
    }
}


