import { GoogleLogout } from "react-google-login";

const clientId="157706975933-5mp07f2obqtjbrtbf3amqvts8s7q8puf.apps.googleusercontent.com"
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