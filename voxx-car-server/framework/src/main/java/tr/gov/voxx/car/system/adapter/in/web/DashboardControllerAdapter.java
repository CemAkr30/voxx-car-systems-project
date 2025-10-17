package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tr.gov.voxx.car.system.adapter.in.web.data.AracFirmaDetayResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.SigortaDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.AracFirmaDetayMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MTVDurumMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MuayeneDurumMapper;
import tr.gov.voxx.car.system.adapter.in.web.mapper.SigortaDurumMapper;
import tr.gov.voxx.car.system.application.port.in.*;
import tr.gov.voxx.car.system.domain.entity.Mtv;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
    private final AracFirmaDetayApplicationQueryPort aracFirmaDetayApplicationQueryPort;

    @GetMapping("/mtv")
    @Operation(summary = "MTV Durumu", description = "Belirtilen status parametresine göre MTV durumunu getirir")
    public ResponseEntity<MTVDurumResponse> getMTVDurum(
            @RequestParam String status) {
        // status parametresini Boolean'a çevir
        Boolean odendi = "odenmis".equalsIgnoreCase(status);
        
        // Tüm MTV'leri al ve filtrele
        var tumMtvler = mtvApplicationQueryPort.getAll();
        var mtvList = tumMtvler.stream()
                .filter(mtv -> odendi.equals(mtv.getOdendi()))
                .toList();

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
                .map(Mtv::getMtvOdeyenFirma)
                .filter(Objects::nonNull)
                .filter(id -> !id.isEmpty())
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

    @GetMapping("/muayene")
    @Operation(summary = "Muayene Durumu", description = "Belirtilen status parametresine göre muayene durumunu getirir")
    public ResponseEntity<MuayeneDurumResponse> getMuayeneDurum(
            @RequestParam String status) {
        // Şu anki tarihi kullan
        java.time.LocalDate kontrolTarihi = java.time.LocalDate.now();

        // 15 gün sonrasına kadar olan muayeneleri al
        java.time.Instant bitisTarihi = kontrolTarihi.plusDays(15).atStartOfDay(java.time.ZoneId.systemDefault()).toInstant();

        var tumMuayeneler = muayeneApplicationQueryPort.findByBitisTarihiBefore(bitisTarihi);

        // Status parametresini Boolean'a çevir
        Boolean odendi = "odenmis".equals(status);

        // Sadece 15 günden az kalan muayeneleri filtrele ve ödeme durumuna göre filtrele
        var muayeneList = tumMuayeneler.stream()
                .filter(muayene -> {
                    if (muayene.getBitisTarihi() == null) return false;
                    java.time.LocalDate bitisTarihiLocal = muayene.getBitisTarihi().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                    long kalanGun = java.time.temporal.ChronoUnit.DAYS.between(kontrolTarihi, bitisTarihiLocal);
                    boolean kalanGunKontrolu = kalanGun <= 15 && kalanGun >= 0; // Sadece 15 günden az kalan ve henüz bitmemiş olanlar
                    boolean odemeDurumuKontrolu = odendi.equals(muayene.getOdendi());
                    return kalanGunKontrolu && odemeDurumuKontrolu;
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
                .filter(muayene -> muayene.getOdeyenFirmaId() != null && !muayene.getOdeyenFirmaId().getValue().isEmpty())
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

    @GetMapping("/sigorta")
    @Operation(summary = "Sigorta Durumu", description = "Sigorta bitişine 15 günden az kalan sigortaları getirir")
    public ResponseEntity<SigortaDurumResponse> getSigortaDurum() {
        // Şu anki tarihi kullan
        java.time.LocalDate kontrolTarihi = java.time.LocalDate.now();

        // 15 gün sonrasına kadar olan sigortaları al
        java.time.Instant bitisTarihi = kontrolTarihi.plusDays(15).atStartOfDay(java.time.ZoneId.systemDefault()).toInstant();

        var tumSigortalar = sigortaKaskoApplicationQueryPort.findByBitisTarihiBefore(bitisTarihi);

        // Sadece 15 günden az kalan sigortaları filtrele
        var sigortaList = tumSigortalar.stream()
                .filter(sigorta -> {
                    if (sigorta.getBitisTarihi() == null) return false;
                    java.time.LocalDate bitisTarihiLocal = sigorta.getBitisTarihi().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                    long kalanGun = java.time.temporal.ChronoUnit.DAYS.between(kontrolTarihi, bitisTarihiLocal);
                    return kalanGun <= 15 && kalanGun >= 0; // Sadece 15 günden az kalan ve henüz bitmemiş olanlar
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

    @GetMapping("/filo")
    @Operation(summary = "Filo Durumu", description = "Aktif veya pasif araç filolarını getirir")
    public ResponseEntity<?> getFiloDurum(@RequestParam String status) {
        boolean isAktif = status.equalsIgnoreCase("aktif");
        var list = aracFiloApplicationQueryPort.findByAktiflikDurumu(isAktif);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/firma")
    @Operation(summary = "Firma ve Araç Sayısı", description = "Her firmanın kiraladığı araç sayısını getirir")
    public ResponseEntity<List<String>> getFirmaAracSayisi() {
        var kiralananAraclar = aracFirmaDetayApplicationQueryPort.getTumDetaylar();

        var firmaAracSayisiMap = kiralananAraclar.stream()
                .filter(detay -> detay.getFirmaId() != null)
                .collect(Collectors.groupingBy(
                        detay -> detay.getFirmaId().getValue(),
                        Collectors.counting()
                ));

        var response = firmaAracSayisiMap.entrySet().stream()
                .map(entry -> {
                    var firma = firmaApplicationQueryPort.get(new FirmaId(entry.getKey()));
                    return firma.getUnvan() + " / " + entry.getValue() + " araç";
                })
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/kira")
    @Operation(summary = "Kiralanan Araçlar", description = "Sözleşme bitiş tarihine göre sıralanmış kiralanan araçları getirir")
    public ResponseEntity<List<AracFirmaDetayResponse>> getKiralananAraclar() {
        var detayList = aracFirmaDetayApplicationQueryPort.getKiralananAraclarSirali();

        var response = AracFirmaDetayMapper.toResponseList(detayList);

        return ResponseEntity.ok(response);
    }
} 