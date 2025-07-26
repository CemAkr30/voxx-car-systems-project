package tr.gov.voxx.car.system.adapter.in.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.mapper.MTVDurumMapper;
import tr.gov.voxx.car.system.application.port.in.AracFiloApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.in.MTVApplicationQueryPort;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import static tr.gov.voxx.car.system.constants.EndpointPath.DASHBOARD_ENDPOINT_V1;

@RestController
@RequestMapping(value = DASHBOARD_ENDPOINT_V1)
@RequiredArgsConstructor
@Tag(name = "Dashboard API", description = "Dashboard işlemleri")
public class DashboardControllerAdapter {

    private final MTVApplicationQueryPort mtvApplicationQueryPort;
    private final AracFiloApplicationQueryPort aracFiloApplicationQueryPort;

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
} 