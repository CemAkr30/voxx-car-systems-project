const createUrls = (version: string, endpoints: string[]) => {
  const baseUrl = `/${version}`;
  return endpoints.reduce((acc: Record<string, string>, endpoint: string) => {
    acc[endpoint] = `${baseUrl}/${endpoint}`;
    return acc;
  }, {});
};

const currentVersion = "v1";
const endpoints = [
  "marka",
  "adres",
  "alisfaturasi",
  "arackullanan",
  "aracfilo",
  "bakim",
  "filodancikis",
  "firma",
  "hasar",
  "iletisim",
  "kaza",
  "model",
  "mtv",
  "muayene",
  "sigorta",
];

const urls = createUrls(currentVersion, endpoints);

export default urls;
