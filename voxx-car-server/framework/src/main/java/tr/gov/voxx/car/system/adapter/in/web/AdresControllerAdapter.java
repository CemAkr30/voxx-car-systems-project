package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.AdresRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.AdresResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.AdresMapper;
import tr.gov.voxx.car.system.application.port.in.AdresApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.AdresApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.ADRES_ENDPOINT_V1;

@RestController
@RequestMapping(value = ADRES_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Adres API", description = "Adres CRUD işlemleri")
public class AdresControllerAdapter {

    private final AdresApplicationCommandPort adresApplicationCommandPort;
    private final AdresApplicationQueryPort adresApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Adres Getir", description = "ID’ye göre adres verisini döner")
    public ResponseEntity<AdresResponse> get(@PathVariable String id) {
        Adres adres = adresApplicationQueryPort.get(new AdresId(id));
        return ResponseEntity.ok(AdresMapper.toResponse(adres));
    }

    @GetMapping
    @Operation(summary = "Tüm Adresler", description = "Tüm adres listesini getirir")
    public ResponseEntity<List<AdresResponse>> getAll() {
        List<Adres> adresList = adresApplicationQueryPort.getAll();
        return ResponseEntity.ok(AdresMapper.toResponseList(adresList));
    }

    @PostMapping
    @Operation(summary = "Adres Oluştur", description = "Yeni bir adres oluşturur")
    public ResponseEntity<Void> create(@RequestBody AdresRequest request) {
        Adres adres = AdresMapper.toAdres(request);
        adresApplicationCommandPort.post(adres);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Adres Güncelle", description = "Adres bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody AdresRequest request) {
        Adres adres = AdresMapper.toAdres(request);
        adres.setId(new AdresId(id));
        adresApplicationCommandPort.put(adres);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Adres Sil", description = "Belirtilen ID ile adres siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        adresApplicationCommandPort.deleteById(new AdresId(id));
        return ResponseEntity.noContent().build();
    }
}
