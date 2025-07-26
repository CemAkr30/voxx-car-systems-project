package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneDurumRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MTVDurumMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MuayeneDurumMapper;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.MTVApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.MuayeneApplicationQueryPort;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import static tr.gov.voxx.car.system.constants.EndpointPath.DASHBOARD_ENDPOINT_V1;

@RestController
@RequestMapping(value = DASHBOARD_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Dashboard API", description = "Dashboard işlemleri")
public class DashboardControllerAdapter {

    private final MTVApplicationQueryPort mtvApplicationQueryPort;
    private final AracFiloApplicationQueryPort aracFiloApplicationQueryPort;
    private final MuayeneApplicationQueryPort muayeneApplicationQueryPort;

    @PostMapping("/mtvdurum")
    @Operation(summary = "MTV Durumu", description = "Belirtilen kriterlere göre MTV durumunu getirir")
    public ResponseEntity<MTVDurumResponse> getMTVDurum(@RequestBody @Valid MTVDurumRequest request) {
        var mtvList = mtvApplicationQueryPort.findByYilAndTaksitAndOdendi(
                request.getYil(),
                request.getTaksit(),
                request.getOdendi()
        );

        // Araç plakalarını almak için aracFiloId'leri topla
        var aracFiloIds = mtvList.stream()
                .map(mtv -> mtv.getAracFiloId().getValue())
                .distinct()
                .toList();

        // Araç bilgilerini al ve Map'e çevir
        var aracFiloMap = aracFiloIds.stream()
                .collect(java.util.stream.Collectors.toMap(
                        id -> id,
                        id -> aracFiloApplicationQueryPort.get(new AracFiloId(id))
                ));

        return ResponseEntity.ok(MTVDurumMapper.toResponse(mtvList, aracFiloMap));
    }

    @PostMapping("/muayenedurum")
    @Operation(summary = "Muayene Durumu", description = "Belirtilen tarihe göre muayene bitişine 15 günden az kalan muayeneleri getirir")
    public ResponseEntity<MuayeneDurumResponse> getMuayeneDurum(@RequestBody @Valid MuayeneDurumRequest request) {
        // 15 gün sonrasına kadar olan muayeneleri al
        java.time.Instant bitisTarihi = request.getTarih().plusDays(15).atStartOfDay(java.time.ZoneId.systemDefault()).toInstant();

        var tumMuayeneler = muayeneApplicationQueryPort.findByBitisTarihiBefore(bitisTarihi);

        // Sadece 15 günden az kalan muayeneleri filtrele
        var muayeneList = tumMuayeneler.stream()
                .filter(muayene -> {
                    if (muayene.getBitisTarihi() == null) return false;
                    java.time.LocalDate bitisTarihiLocal = muayene.getBitisTarihi().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                    long kalanGun = java.time.temporal.ChronoUnit.DAYS.between(request.getTarih(), bitisTarihiLocal);
                    return kalanGun <= 15 && kalanGun >= 0; // Sadece 15 günden az kalan ve henüz bitmemiş olanlar
                })
                .toList();

        // Araç plakalarını almak için aracFiloId'leri topla
        var aracFiloIds = muayeneList.stream()
                .map(muayene -> muayene.getAracFiloId().getValue())
                .distinct()
                .toList();

        // Araç bilgilerini al ve Map'e çevir
        var aracFiloMap = aracFiloIds.stream()
                .collect(java.util.stream.Collectors.toMap(
                        id -> id,
                        id -> aracFiloApplicationQueryPort.get(new AracFiloId(id))
                ));

        return ResponseEntity.ok(MuayeneDurumMapper.toResponse(muayeneList, aracFiloMap, request.getTarih()));
    }
} 