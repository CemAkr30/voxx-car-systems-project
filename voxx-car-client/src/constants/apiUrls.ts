const createUrls = <T extends readonly string[]>(
	version: string,
	endpoints: T,
) => {
	const baseUrl = `/${version}`;
	return endpoints.reduce(
		(acc, endpoint) => {
			acc[endpoint as T[number]] = `${baseUrl}/${endpoint}`;
			return acc;
		},
		{} as Record<T[number], string>,
	);
};

const currentVersion = "v1" as const;

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
] as const;

const urls = createUrls(currentVersion, endpoints);

export default urls;
