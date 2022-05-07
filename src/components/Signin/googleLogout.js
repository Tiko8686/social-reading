import { GoogleLogout } from "react-google-login";

const clientId="699412387887-1pae7suk9l9bstfdaer6826gjc118k0m.apps.googleusercontent.com"
function Logout() {
    const onSuccess=()=>{
        console.log("logout succesfully");
    }
    return(
        <div id="signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
            />

        </div>
    )
}
export default Logout;