package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.ModelMapper;
import tr.gov.voxx.car.system.entity.Model;
import tr.gov.voxx.car.system.port.in.ModelApplicationServicePort;
import tr.gov.voxx.car.system.valueobject.ModelId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.MODEL_ENDPOINT_V1;


@RestController
@RequestMapping(value = MODEL_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Model API", description = "Araç modelleri için CRUD işlemleri")
public class ModelControllerAdapter {

    private final ModelApplicationServicePort modelApplicationServicePort;

    @GetMapping("/{id}")
    @Operation(summary = "Model Getir", description = "ID’ye göre model verisini döner")
    public ResponseEntity<ModelResponse> get(@PathVariable Integer id) {
        Model model = modelApplicationServicePort.get(new ModelId(id));
        return ResponseEntity.ok(ModelMapper.INSTANCE.toResponse(model));
    }

    @GetMapping
    @Operation(summary = "Tüm Modeller", description = "Tüm model listesini getirir")
    public ResponseEntity<List<ModelResponse>> getAll() {
        List<Model> models = modelApplicationServicePort.getAll();
        return ResponseEntity.ok(ModelMapper.INSTANCE.toResponseList(models));
    }

    @PostMapping
    @Operation(summary = "Model Oluştur", description = "Yeni bir model oluşturur")
    public ResponseEntity<ModelResponse> create(@RequestBody ModelRequest request) {
        Model model = ModelMapper.INSTANCE.toModel(request);
        return ResponseEntity.ok(
                ModelMapper.INSTANCE.toResponse(modelApplicationServicePort.post(model))
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Model Güncelle", description = "Model bilgisini günceller")
    public ResponseEntity<ModelResponse> update(@PathVariable Integer id,
                                                @RequestBody ModelRequest request) {
        Model model = ModelMapper.INSTANCE.toModel(request);
        model.setId(new ModelId(id));
        return ResponseEntity.ok(ModelMapper.INSTANCE.toResponse(modelApplicationServicePort.put(model)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Model Sil", description = "Belirtilen ID ile modeli siler")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        modelApplicationServicePort.deleteById(new ModelId(id));
        return ResponseEntity.noContent().build();
    }
}
