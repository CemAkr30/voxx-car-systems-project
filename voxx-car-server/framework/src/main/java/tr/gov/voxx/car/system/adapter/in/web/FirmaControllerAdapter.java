package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.AdresResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.FirmaRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.FirmaResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.AdresMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.FirmaMapper;
import tr.gov.voxx.car.system.application.port.in.AdresApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.FirmaApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.FirmaApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.FIRMA_ENDPOINT_V1;

@RestController
@RequestMapping(value = FIRMA_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Firma API", description = "Firma CRUD işlemleri")
public class FirmaControllerAdapter {

    private final FirmaApplicationCommandPort firmaApplicationCommandPort;
    private final FirmaApplicationQueryPort firmaApplicationQueryPort;

    private final AdresApplicationQueryPort adresApplicationQueryPort;

    @GetMapping("/{id}")
    @Operation(summary = "Firma Getir", description = "ID’ye göre firma verisini döner")
    public ResponseEntity<FirmaResponse> get(@PathVariable String id) {
        Firma firma = firmaApplicationQueryPort.get(new FirmaId(id));
        return ResponseEntity.ok(FirmaMapper.toResponse(firma));
    }

    @GetMapping
    @Operation(summary = "Tüm Firmalar", description = "Tüm firma listesini getirir")
    public ResponseEntity<List<FirmaResponse>> getAll() {
        List<Firma> firmaList = firmaApplicationQueryPort.getAll();
        return ResponseEntity.ok(FirmaMapper.toResponseList(firmaList));
    }

    @PostMapping
    @Operation(summary = "Firma Oluştur", description = "Yeni bir firma oluşturur")
    public ResponseEntity<Void> create(@RequestBody FirmaRequest request) {
        Firma firma = FirmaMapper.toFirma(request);
        firmaApplicationCommandPort.post(firma);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Firma Güncelle", description = "Firma bilgisini günceller")
    public ResponseEntity<Void> update(@PathVariable String id,
                                       @RequestBody FirmaRequest request) {
        Firma firma = FirmaMapper.toFirma(request);
        firma.setId(new FirmaId(id));
        firmaApplicationCommandPort.put(firma);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Firma Sil", description = "Belirtilen ID ile firma siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        firmaApplicationCommandPort.deleteById(new FirmaId(id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/adres")
    @Operation(summary = "Firma Kaynağına Göre Adresleri Getir", description = "Belirtilen Firma ID ile ilgili bütün adreslerini getirir")
    public ResponseEntity<List<AdresResponse>> findFirmaIdGetAllAdres(@PathVariable("id") String firmaId) {
        List<Adres> adresList = adresApplicationQueryPort.findFirmaIdGetAll(firmaId);
        return ResponseEntity.ok(AdresMapper.toResponseList(adresList));
    }
}
