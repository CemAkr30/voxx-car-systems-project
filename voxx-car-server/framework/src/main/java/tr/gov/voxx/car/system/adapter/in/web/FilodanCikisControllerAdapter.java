package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.FilodanCikisRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.FilodanCikisResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.FilodanCikisMapper;
import tr.gov.voxx.car.system.application.port.in.FilodanCikisApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.FilodanCikisApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.FilodanCikisId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.FILODANCIKIS_ENDPOINT_V1;

@RestController
@RequestMapping(value = FILODANCIKIS_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "FilodanCikis API", description = "FilodanCikis CRUD işlemleri")
public class FilodanCikisControllerAdapter {

    private final FilodanCikisApplicationCommandPort applicationCommandPort;
    private final FilodanCikisApplicationQueryPort applicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Filodan çıkış verisi Getir", description = "ID’ye göre filodan çıkış verisini döner")
    public ResponseEntity<FilodanCikisResponse> get(@PathVariable String id) {
        FilodanCikis filodanCikis = applicationQueryPort.get(new FilodanCikisId(id));
        return ResponseEntity.ok(FilodanCikisMapper.toResponse(filodanCikis));
    }

    @GetMapping
    @Operation(summary = "Tüm FilodanCikislar", description = "Tüm FilodanCikislar listesini getirir")
    public ResponseEntity<List<FilodanCikisResponse>> getAll() {
        List<FilodanCikis> filodanCikisList = applicationQueryPort.getAll();
        return ResponseEntity.ok(FilodanCikisMapper.toResponseList(filodanCikisList));
    }

    @PostMapping
    @Operation(summary = "FilodanCikis Oluştur", description = "Yeni bir FilodanCikis oluşturur")
    public ResponseEntity<Void> create(@RequestBody FilodanCikisRequest request) {
        FilodanCikis filodanCikis = FilodanCikisMapper.toFilodanCikis(request);
        applicationCommandPort.post(filodanCikis);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "FilodanCikis Güncelle", description = "FilodanCikis bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody FilodanCikisRequest request) {
        FilodanCikis filodanCikis = FilodanCikisMapper.toFilodanCikis(request);
        filodanCikis.setId(new FilodanCikisId(id));
        applicationCommandPort.put(filodanCikis);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "FilodanCikis Sil", description = "Belirtilen ID ile FilodanCikis siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        applicationCommandPort.deleteById(new FilodanCikisId(id));
        return ResponseEntity.noContent().build();
    }
}




