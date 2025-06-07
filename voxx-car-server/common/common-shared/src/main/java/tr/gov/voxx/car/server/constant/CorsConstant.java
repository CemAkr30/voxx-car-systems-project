package tr.gov.voxx.car.server.constant;

public final class CorsConstant {

    public static final String PREFIX_STAR = "*";
    public static final String PREFIX_COMMA = ",";

    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String HEADER_CONTENT_TYPE = "Content-Type";
    public static final String HEADER_ACCEPT = "Accept";

    private CorsConstant() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
}