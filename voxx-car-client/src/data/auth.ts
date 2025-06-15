export default async function getCurrentUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const accessToken = localStorage.getItem("accessToken") || null;
  switch (accessToken) {
    case "1": {
      return { id: 1, name: "Bülent Güven" };
    }
    case "2": {
      return { id: 2, name: "Cem Akar" };
    }
    default:
      return { id: 3, name: "Berk Öncü" };
  }
}
