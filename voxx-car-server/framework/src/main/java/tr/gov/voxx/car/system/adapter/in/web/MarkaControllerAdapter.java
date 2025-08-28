package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.MarkaRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MarkaResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MarkaMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.ModelMapper;
import tr.gov.voxx.car.system.application.port.in.MarkaApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.MarkaApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.ModelApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Marka;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.MarkaId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.MARKA_ENDPOINT_V1;

@RestController
@RequestMapping(value = MARKA_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Marka API", description = "Araç markaları için CRUD işlemleri")
public class MarkaControllerAdapter {

    private final MarkaApplicationCommandPort markaApplicationCommandPort;
    private final MarkaApplicationQueryPort markaApplicationQueryPort;

    private final ModelApplicationQueryPort modelApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Marka Getir", description = "ID’ye göre marka verisini döner")
    public ResponseEntity<MarkaResponse> get(@PathVariable String id) {
        Marka marka = markaApplicationQueryPort.get(new MarkaId(id));
        return ResponseEntity.ok(MarkaMapper.toResponse(marka));
    }

    @GetMapping
    @Operation(summary = "Tüm Markalar", description = "Tüm marka listesini getirir")
    public ResponseEntity<List<MarkaResponse>> getAll() {
        List<Marka> markas = markaApplicationQueryPort.getAll();
        return ResponseEntity.ok(MarkaMapper.toResponseList(markas));
    }

    @PostMapping
    @Operation(summary = "Marka Oluştur", description = "Yeni bir marka oluşturur")
    public ResponseEntity<Void> create(@RequestBody MarkaRequest request) {
        Marka marka = MarkaMapper.toMarka(request);
        markaApplicationCommandPort.post(marka);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Marka Güncelle", description = "Marka bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody MarkaRequest request) {
        Marka marka = MarkaMapper.toMarka(request);
        marka.setId(new MarkaId(id));
        markaApplicationCommandPort.put(marka);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Marka Sil", description = "Belirtilen ID ile marka siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        markaApplicationCommandPort.deleteById(new MarkaId(id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/model")
    @Operation(summary = "Marka Kaynağına Göre Modelleri Getir", description = "Belirtilen Marka ID ile ilgili bütün modelleri getirir")
    public ResponseEntity<List<ModelResponse>> findByMarkaIdGetAllModel(@PathVariable("id") String markaId) {
        List<Model> modelList = modelApplicationQueryPort.findMarkaIdGetAll(markaId);
        return ResponseEntity.ok(ModelMapper.toResponseList(modelList));
    }

}
