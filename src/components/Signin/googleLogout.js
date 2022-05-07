import { GoogleLogout } from "react-google-login";

const clientId="157706975933-3k09hckmf5hnuqtg46ejgvf3g14pibh1.apps.googleusercontent.com "
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