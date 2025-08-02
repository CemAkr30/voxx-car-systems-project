package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.SigortaDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MTVDurumMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MuayeneDurumMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.SigortaDurumMapper;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.FirmaApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.MTVApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.MuayeneApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.SigortaKaskoApplicationQueryPort;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import static tr.gov.voxx.car.system.constants.EndpointPath.DASHBOARD_ENDPOINT_V1;

@RestController
@RequestMapping(value = DASHBOARD_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Dashboard API", description = "Dashboard işlemleri")
public class DashboardControllerAdapter {

    private final MTVApplicationQueryPort mtvApplicationQueryPort;
    private final AracFiloApplicationQueryPort aracFiloApplicationQueryPort;
    private final MuayeneApplicationQueryPort muayeneApplicationQueryPort;
    private final SigortaKaskoApplicationQueryPort sigortaKaskoApplicationQueryPort;
    private final FirmaApplicationQueryPort firmaApplicationQueryPort;

    @GetMapping("/mtvdurum")
    @Operation(summary = "MTV Durumu", description = "Belirtilen kriterlere göre MTV durumunu getirir")
    public ResponseEntity<MTVDurumResponse> getMTVDurum(
            @RequestParam String yil,
            @RequestParam String taksit,
            @RequestParam Boolean odendi) {
        var mtvList = mtvApplicationQueryPort.findByYilAndTaksitAndOdendi(yil, taksit, odendi);

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

        // Firma bilgilerini almak için odeyenFirmaId'leri topla
        var firmaIds = mtvList.stream()
                .filter(mtv -> mtv.getOdeyenFirmaId() != null)
                .map(mtv -> mtv.getOdeyenFirmaId().getValue())
                .distinct()
                .toList();

        // Firma bilgilerini al ve Map'e çevir
        var firmaMap = firmaIds.stream()
                .collect(java.util.stream.Collectors.toMap(
                        id -> id,
                        id -> firmaApplicationQueryPort.get(new FirmaId(id))
                ));

        return ResponseEntity.ok(MTVDurumMapper.toResponse(mtvList, aracFiloMap, firmaMap));
    }

    @GetMapping("/muayenedurum")
    @Operation(summary = "Muayene Durumu", description = "Belirtilen tarihe göre muayene bitişine 15 günden az kalan muayeneleri getirir")
    public ResponseEntity<MuayeneDurumResponse> getMuayeneDurum() {
        // Şu anki tarihi kullan
        java.time.LocalDate kontrolTarihi = java.time.LocalDate.now();

        // 15 gün sonrasına kadar olan muayeneleri al
        java.time.Instant bitisTarihi = kontrolTarihi.plusDays(15).atStartOfDay(java.time.ZoneId.systemDefault()).toInstant();

        var tumMuayeneler = muayeneApplicationQueryPort.findByBitisTarihiBefore(bitisTarihi);

        // Sadece 15 günden az kalan muayeneleri filtrele
        var muayeneList = tumMuayeneler.stream()
                .filter(muayene -> {
                    if (muayene.getBitisTarihi() == null) return false;
                    java.time.LocalDate bitisTarihiLocal = muayene.getBitisTarihi().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                    long kalanGun = java.time.temporal.ChronoUnit.DAYS.between(kontrolTarihi, bitisTarihiLocal);
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

        // Firma bilgilerini almak için odeyenFirmaId'leri topla
        var firmaIds = muayeneList.stream()
                .filter(muayene -> muayene.getOdeyenFirmaId() != null)
                .map(muayene -> muayene.getOdeyenFirmaId().getValue())
                .distinct()
                .toList();

        // Firma bilgilerini al ve Map'e çevir
        var firmaMap = firmaIds.stream()
                .collect(java.util.stream.Collectors.toMap(
                        id -> id,
                        id -> firmaApplicationQueryPort.get(new FirmaId(id))
                ));

        return ResponseEntity.ok(MuayeneDurumMapper.toResponse(muayeneList, aracFiloMap, firmaMap, kontrolTarihi));
    }

    @GetMapping("/sigortadurum")
    @Operation(summary = "Sigorta Durumu", description = "Belirtilen tarihe göre sigorta bitişine 30 günden az kalan sigortaları getirir")
    public ResponseEntity<SigortaDurumResponse> getSigortaDurum() {
        // Şu anki tarihi kullan
        java.time.LocalDate kontrolTarihi = java.time.LocalDate.now();

        // 30 gün sonrasına kadar olan sigortaları al
        java.time.Instant bitisTarihi = kontrolTarihi.plusDays(30).atStartOfDay(java.time.ZoneId.systemDefault()).toInstant();

        var tumSigortalar = sigortaKaskoApplicationQueryPort.findByBitisTarihiBefore(bitisTarihi);

        // Sadece 30 günden az kalan sigortaları filtrele
        var sigortaList = tumSigortalar.stream()
                .filter(sigorta -> {
                    if (sigorta.getBitisTarihi() == null) return false;
                    java.time.LocalDate bitisTarihiLocal = sigorta.getBitisTarihi().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                    long kalanGun = java.time.temporal.ChronoUnit.DAYS.between(kontrolTarihi, bitisTarihiLocal);
                    return kalanGun <= 30 && kalanGun >= 0; // Sadece 30 günden az kalan ve henüz bitmemiş olanlar
                })
                .toList();

        // Araç plakalarını almak için aracFiloId'leri topla
        var aracFiloIds = sigortaList.stream()
                .map(sigorta -> sigorta.getAracFiloId().getValue())
                .distinct()
                .toList();

        // Araç bilgilerini al ve Map'e çevir
        var aracFiloMap = aracFiloIds.stream()
                .collect(java.util.stream.Collectors.toMap(
                        id -> id,
                        id -> aracFiloApplicationQueryPort.get(new AracFiloId(id))
                ));

        return ResponseEntity.ok(SigortaDurumMapper.toResponse(sigortaList, aracFiloMap, kontrolTarihi));
    }
} 