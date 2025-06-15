export default async function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken") || null;
  switch (accessToken) {
    case "1": {
      return { id: 1, name: "Bülent Güven" };
    }
    case "2": {
      return { id: 2, name: "Cem Akar" };
    }
    default:
      return null;
  }
}
