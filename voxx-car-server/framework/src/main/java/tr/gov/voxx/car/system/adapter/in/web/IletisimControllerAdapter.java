package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.IletisimRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.IletisimResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.IletisimMapper;
import tr.gov.voxx.car.system.application.port.in.IletisimApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.IletisimApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.ILETISIM_ENDPOINT_V1;

@RestController
@RequestMapping(value = ILETISIM_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Iletisim API", description = "Iletisim CRUD işlemleri")
public class IletisimControllerAdapter {

    private final IletisimApplicationCommandPort iletisimApplicationCommandPort;
    private final IletisimApplicationQueryPort iletisimApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Iletisim Getir", description = "ID’ye göre iletisim verisini döner")
    public ResponseEntity<IletisimResponse> get(@PathVariable String id) {
        Iletisim iletisim = iletisimApplicationQueryPort.get(new IletisimId(id));
        return ResponseEntity.ok(IletisimMapper.toResponse(iletisim));
    }

    @GetMapping
    @Operation(summary = "Tüm Iletisimler", description = "Tüm iletisim listesini getirir")
    public ResponseEntity<List<IletisimResponse>> getAll() {
        List<Iletisim> iletisimList = iletisimApplicationQueryPort.getAll();
        return ResponseEntity.ok(IletisimMapper.toResponseList(iletisimList));
    }

    @PostMapping
    @Operation(summary = "Iletisim Oluştur", description = "Yeni bir iletisim oluşturur")
    public ResponseEntity<Void> create(@RequestBody IletisimRequest request) {
        Iletisim iletisim = IletisimMapper.toIletisim(request);
        iletisimApplicationCommandPort.post(iletisim);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Iletisim Güncelle", description = "Iletisim bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody IletisimRequest request) {
        Iletisim iletisim = IletisimMapper.toIletisim(request);
        iletisim.setId(new IletisimId(id));
        iletisimApplicationCommandPort.put(iletisim);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Iletisim Sil", description = "Belirtilen ID ile iletisim siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        iletisimApplicationCommandPort.deleteById(new IletisimId(id));
        return ResponseEntity.noContent().build();
    }
}
