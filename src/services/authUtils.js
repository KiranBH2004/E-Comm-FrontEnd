export function executeLogout(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    window.location.href = "/login";
}