package tr.gov.voxx.car.system.adapter.in.web.mapper;

import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneDurumDetayResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.entity.Firma;
import tr.gov.voxx.car.system.domain.entity.Muayene;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MuayeneDurumDetayMapper {

    public static MuayeneDurumDetayResponse toResponse(Muayene muayene, Map<String, AracFilo> aracFiloMap, Map<String, Firma> firmaMap, LocalDate kontrolTarihi) {
        AracFilo aracFilo = aracFiloMap.get(muayene.getAracFiloId().getValue());
        String plaka = aracFilo != null ? aracFilo.getPlaka() : "Bilinmiyor";

        // Firma bilgilerini al
        String odeyenFirmaUnvani = null;
        if (muayene.getOdeyenFirmaId() != null) {
            Firma firma = firmaMap.get(muayene.getOdeyenFirmaId().getValue());
            odeyenFirmaUnvani = firma != null ? firma.getUnvan() : null;
        }

        // Kalan gün hesaplaması
        Long kalanGun = null;
        if (muayene.getBitisTarihi() != null) {
            LocalDate bitisTarihi = muayene.getBitisTarihi().atZone(ZoneId.systemDefault()).toLocalDate();
            kalanGun = java.time.temporal.ChronoUnit.DAYS.between(kontrolTarihi, bitisTarihi);
        }

        return new MuayeneDurumDetayResponse(
                plaka,
                muayene.getMuayeneTipi() != null ? muayene.getMuayeneTipi().name() : null,
                muayene.getMakbuzNo(),
                odeyenFirmaUnvani,
                muayene.getBaslangicTarihi(),
                muayene.getBitisTarihi(),
                muayene.getGecikmeCezasi(),
                muayene.getAciklama(),
                muayene.getYeri(),
                muayene.getMiktar(),
                muayene.getOdemeTipi() != null ? muayene.getOdemeTipi().name() : null,
                muayene.getOdendi(),
                kalanGun
        );
    }

    public static List<MuayeneDurumDetayResponse> toResponseList(List<Muayene> muayeneList, Map<String, AracFilo> aracFiloMap, Map<String, Firma> firmaMap, LocalDate kontrolTarihi) {
        return muayeneList.stream()
                .map(muayene -> toResponse(muayene, aracFiloMap, firmaMap, kontrolTarihi))
                .collect(Collectors.toList());
    }
} 