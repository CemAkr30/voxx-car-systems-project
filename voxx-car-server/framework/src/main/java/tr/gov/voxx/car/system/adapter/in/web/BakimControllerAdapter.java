package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.BakimRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.BakimResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.BakimMapper;
import tr.gov.voxx.car.system.application.port.in.BakimApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.BakimApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Bakim;
import tr.gov.voxx.car.system.domain.valueobject.BakimId;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bakim")
@RequiredArgsConstructor
@Tag(name = "Bakım API", description = "Araç bakım işlemleri için uç noktalar")
public class BakimControllerAdapter {

    private final BakimApplicationCommandPort commandPort;
    private final BakimApplicationQueryPort queryPort;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody BakimRequest request) {
        commandPort.post(BakimMapper.toEntity(request));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable String id, @RequestBody BakimRequest request) {
        Bakim bakim = BakimMapper.toEntity(request);
        bakim.setId(new BakimId(id));
        commandPort.put(bakim);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BakimResponse> get(@PathVariable String id) {
        return ResponseEntity.ok(BakimMapper.toResponse(queryPort.get(new BakimId(id))));
    }

    @GetMapping
    public ResponseEntity<List<BakimResponse>> getAll() {
        return ResponseEntity.ok(BakimMapper.toResponseList(queryPort.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        commandPort.deleteById(new BakimId(id));
        return ResponseEntity.noContent().build();
    }
}
