package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.*;
import tr.gov.voxx.car.system.adapter.in.web.mapper.*;
import tr.gov.voxx.car.system.application.port.in.*;
import tr.gov.voxx.car.system.domain.entity.*;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

import static tr.gov.voxx.car.system.constants.EndpointPath.ARAC_FILO_ENDPOINT_V1;

@RestController
@RequestMapping(value = ARAC_FILO_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Araç Filo API", description = "Filo araçları için CRUD işlemleri")
public class AracFiloControllerAdapter {

    private final AracFiloApplicationCommandPort commandPort;
    private final AracFiloApplicationQueryPort queryPort;

    private final SigortaKaskoApplicationQueryPort sigortaKaskoApplicationQueryPort;
    private final MTVApplicationQueryPort mtvApplicationQueryPort;
    private final BakimApplicationQueryPort bakimApplicationQueryPort;
    private final MuayeneApplicationQueryPort muayeneApplicationQueryPort;
    private final HasarApplicationQueryPort hasarApplicationQueryPort;
    private final KazaApplicationQueryPort kazaApplicationQueryPort;
    private final AlisFaturasiApplicationQueryPort alisFaturasiApplicationQueryPort;
    private final FilodanCikisApplicationQueryPort filodanCikisApplicationQueryPort;


    @GetMapping("/{id}")
    @Operation(summary = "Araç Getir", description = "ID’ye göre araç bilgisini getirir")
    public ResponseEntity<AracFiloResponse> get(@PathVariable String id) {
        AracFilo entity = queryPort.get(new AracFiloId(id));
        return ResponseEntity.ok(AracFiloMapper.toResponse(entity));
    }

    @GetMapping
    @Operation(summary = "Tüm Araçlar", description = "Tüm filo araç listesini getirir")
    public ResponseEntity<List<AracFiloResponse>> getAll() {
        return ResponseEntity.ok(AracFiloMapper.toResponseList(queryPort.getAll()));
    }

    @PostMapping
    @Operation(summary = "Araç Ekle", description = "Yeni bir filo aracı ekler")
    public ResponseEntity<Void> create(@RequestBody AracFiloRequest request) {
        commandPort.post(AracFiloMapper.toAracFilo(request));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Araç Güncelle", description = "Araç bilgilerini günceller")
    public ResponseEntity<Void> update(@PathVariable String id, @RequestBody AracFiloRequest request) {
        AracFilo entity = AracFiloMapper.toAracFilo(request);
        entity.setId(new AracFiloId(id));
        commandPort.put(entity);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Araç Sil", description = "Belirtilen ID ile aracı siler")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        commandPort.deleteById(new AracFiloId(id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/sigorta")
    @Operation(summary = "Araç ID ye Göre sigortaları getir", description = "Belirtilen Arac ID ile ilgili bütün sigortaları getirir")
    public ResponseEntity<List<SigortaKaskoResponse>> findAracIdGetSigorta(@PathVariable("id") String aracId) {
        List<SigortaKasko> sigortaKaskoList = sigortaKaskoApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(SigortaKaskoMapper.toResponseList(sigortaKaskoList));
    }

    @GetMapping("/{id}/mtv")
    @Operation(summary = "Araç ID ye Göre MTVleri getir", description = "Belirtilen Arac ID ile ilgili bütün MTVleri getirir")
    public ResponseEntity<List<MTVResponse>> findAracIdGetMtv(@PathVariable("id") String aracId) {
        List<Mtv> mtvList = mtvApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(MTVMapper.toResponseList(mtvList));
    }

    @GetMapping("/{id}/bakim")
    @Operation(summary = "Araç ID ye Göre bakımları getir", description = "Belirtilen Arac ID ile ilgili bütün bakımları getirir")
    public ResponseEntity<List<BakimResponse>> findAracIdGetBakim(@PathVariable("id") String aracId) {
        List<Bakim> bakimList = bakimApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(BakimMapper.toResponseList(bakimList));
    }

    @GetMapping("/{id}/muayene")
    @Operation(summary = "Araç ID ye Göre muayeneleri getir", description = "Belirtilen Arac ID ile ilgili bütün muayeneleri getirir")
    public ResponseEntity<List<MuayeneResponse>> findAracIdGetMuayene(@PathVariable("id") String aracId) {
        List<Muayene> muayeneList = muayeneApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(MuayeneMapper.toResponseList(muayeneList));
    }

    @GetMapping("/{id}/hasar")
    @Operation(summary = "Araç ID ye Göre hasarları getir", description = "Belirtilen Arac ID ile ilgili bütün hasarları getirir")
    public ResponseEntity<List<HasarResponse>> findAracIdGetHasar(@PathVariable("id") String aracId) {
        List<Hasar> hasarList = hasarApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(HasarMapper.toResponseList(hasarList));
    }

    @GetMapping("/{id}/kaza")
    @Operation(summary = "Araç ID ye Göre kazaları getir", description = "Belirtilen Arac ID ile ilgili bütün kazaları getirir")
    public ResponseEntity<List<KazaResponse>> findAracIdGetKaza(@PathVariable("id") String aracId) {
        List<Kaza> kazaList = kazaApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(KazaMapper.toResponseList(kazaList));
    }

    @GetMapping("/{id}/alisfaturasi")
    @Operation(summary = "Araç ID ye Göre alış faturalarını getir", description = "Belirtilen Arac ID ile ilgili bütün alış faturalarını getirir")
    public ResponseEntity<List<AlisFaturasiResponse>> findAracIdGetAlisFaturasi(@PathVariable("id") String aracId) {
        List<AlisFaturasi> alisFaturasiList = alisFaturasiApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(AlisFaturasiMapper.toResponseList(alisFaturasiList));
    }

    @GetMapping("/{id}/filodancikis")
    @Operation(summary = "Araç ID ye Göre filodan çıkışları getir", description = "Belirtilen Arac ID ile ilgili bütün filodan çıkışları getirir")
    public ResponseEntity<List<FilodanCikisResponse>> findAracIdGetFilodanCikis(@PathVariable("id") String aracId) {
        List<FilodanCikis> filodanCikisList = filodanCikisApplicationQueryPort.findAracIdGetAll(aracId);
        return ResponseEntity.ok(FilodanCikisMapper.toResponseList(filodanCikisList));
    }
}