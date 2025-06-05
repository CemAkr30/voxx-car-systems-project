package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MTVMapper;
import tr.gov.voxx.car.system.application.port.in.MTVApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.MTVApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.MtvId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.MTV_ENDPOINT_V1;

@RestController
@RequestMapping(value = MTV_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "MTV API", description = "MTV CRUD işlemleri")
public class MTVControllerAdapter {
    private final MTVApplicationCommandPort mtvApplicationCommandPort;
    private final MTVApplicationQueryPort mtvApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "MTV Getir", description = "ID’ye göre MTV verisini döner")
    public ResponseEntity<MTVResponse> get(@PathVariable String id) {
        Mtv mtv = mtvApplicationQueryPort.get(new MtvId(id));
        return ResponseEntity.ok(MTVMapper.toResponse(mtv));
    }

    @GetMapping
    @Operation(summary = "Tüm MTVler", description = "Tüm MTVler listesini getirir")
    public ResponseEntity<List<MTVResponse>> getAll() {
        List<Mtv> mtvList = mtvApplicationQueryPort.getAll();
        return ResponseEntity.ok(MTVMapper.toResponseList(mtvList));
    }

    @PostMapping
    @Operation(summary = "MTV Oluştur", description = "Yeni bir MTV oluşturur")
    public ResponseEntity<Void> create(@RequestBody MTVRequest request) {
        Mtv mtv = MTVMapper.toMtv(request);
        mtvApplicationCommandPort.post(mtv);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "MTV Güncelle", description = "MTV bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody MTVRequest request) {
        Mtv mtv = MTVMapper.toMtv(request);
        mtv.setId(new MtvId(id));
        mtvApplicationCommandPort.put(mtv);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "MTV Sil", description = "Belirtilen ID ile MTV siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        mtvApplicationCommandPort.deleteById(new MtvId(id));
        return ResponseEntity.noContent().build();
    }
}



