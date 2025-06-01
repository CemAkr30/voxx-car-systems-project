package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.KazaRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.KazaResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.KazaMapper;
import tr.gov.voxx.car.system.application.port.in.KazaApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.KazaApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Kaza;
import tr.gov.voxx.car.system.domain.valueobject.KazaId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.KAZA_ENDPOINT_V1;

@RestController
@RequestMapping(value = KAZA_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Kaza API", description = "Araç kazaları için işlemler")
public class KazaControllerAdapter {

    private final KazaApplicationCommandPort commandPort;
    private final KazaApplicationQueryPort queryPort;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody KazaRequest request) {
        commandPort.post(KazaMapper.toKaza(request));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable String id, @RequestBody KazaRequest request) {
        Kaza kaza = KazaMapper.toKaza(request);
        kaza.setId(new KazaId(id));
        commandPort.put(kaza);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<KazaResponse> get(@PathVariable String id) {
        return ResponseEntity.ok(KazaMapper.toResponse(queryPort.get(new KazaId(id))));
    }

    @GetMapping
    public ResponseEntity<List<KazaResponse>> getAll() {
        return ResponseEntity.ok(KazaMapper.toResponseList(queryPort.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        commandPort.deleteById(new KazaId(id));
        return ResponseEntity.noContent().build();
    }
}
