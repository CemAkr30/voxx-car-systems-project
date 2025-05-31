package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.ModelMapper;
import tr.gov.voxx.car.system.application.port.in.ModelApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.ModelApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Model;
import tr.gov.voxx.car.system.domain.valueobject.ModelId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.MODEL_ENDPOINT_V1;


@RestController
@RequestMapping(value = MODEL_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Model API", description = "Araç modelleri için CRUD işlemleri")
public class ModelControllerAdapter {

    private final ModelApplicationCommandPort modelApplicationCommandPort;
    private final ModelApplicationQueryPort modelApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Model Getir", description = "ID’ye göre model verisini döner")
    public ResponseEntity<ModelResponse> get(@PathVariable String id) {
        Model model = modelApplicationQueryPort.get(new ModelId(id));
        return ResponseEntity.ok(ModelMapper.toResponse(model));
    }

    @GetMapping
    @Operation(summary = "Tüm Modeller", description = "Tüm model listesini getirir")
    public ResponseEntity<List<ModelResponse>> getAll() {
        List<Model> models = modelApplicationQueryPort.getAll();
        return ResponseEntity.ok(ModelMapper.toResponseList(models));
    }

    @PostMapping
    @Operation(summary = "Model Oluştur", description = "Yeni bir model oluşturur")
    public ResponseEntity<Void> create(@RequestBody ModelRequest request) {
        Model model = ModelMapper.toModel(request);
        modelApplicationCommandPort.post(model);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Model Güncelle", description = "Model bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody ModelRequest request) {
        Model model = ModelMapper.toModel(request);
        model.setId(new ModelId(id));
        modelApplicationCommandPort.put(model);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Model Sil", description = "Belirtilen ID ile modeli siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        modelApplicationCommandPort.deleteById(new ModelId(id));
        return ResponseEntity.noContent().build();
    }
}
