package tr.gov.voxx.car.system.adapter.in.web.mapper;

import tr.gov.voxx.car.system.adapter.in.web.data.SigortaDurumDetayResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SigortaDurumDetayMapper {

    public static SigortaDurumDetayResponse toResponse(SigortaKasko sigorta, Map<String, AracFilo> aracFiloMap, LocalDate kontrolTarihi) {
        AracFilo aracFilo = aracFiloMap.get(sigorta.getAracFiloId().getValue());
        String plaka = aracFilo != null ? aracFilo.getPlaka() : "Bilinmiyor";

        // Kalan gün hesaplaması
        Long kalanGun = null;
        if (sigorta.getBitisTarihi() != null) {
            LocalDate bitisTarihi = sigorta.getBitisTarihi().atZone(ZoneId.systemDefault()).toLocalDate();
            kalanGun = java.time.temporal.ChronoUnit.DAYS.between(kontrolTarihi, bitisTarihi);
        }

        return new SigortaDurumDetayResponse(
                plaka,
                sigorta.getTip() != null ? sigorta.getTip().name() : null,
                sigorta.getSigortaSirketi(),
                sigorta.getAcente(),
                sigorta.getPoliceNo(),
                sigorta.getBaslangicTarihi(),
                sigorta.getBitisTarihi(),
                kalanGun
        );
    }

    public static List<SigortaDurumDetayResponse> toResponseList(List<SigortaKasko> sigortaList, Map<String, AracFilo> aracFiloMap, LocalDate kontrolTarihi) {
        return sigortaList.stream()
                .map(sigorta -> toResponse(sigorta, aracFiloMap, kontrolTarihi))
                .collect(Collectors.toList());
    }
} 