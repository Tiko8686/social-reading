import GoogleLogin from "react-google-login"

const clientId = "699412387887-1pae7suk9l9bstfdaer6826gjc118k0m.apps.googleusercontent.com"
function Login(){
    const onSuccess=(res)=>{
        console.log("sucess login",res.profileObj);
    }
    const onFailure=(res)=>{
        console.log("failed login",res);
    }
    return(
        <div id="signInButton">
<GoogleLogin
clientId={clientId}
buttonText="Login"
onSuccess={onSuccess}
onFailure={onFailure}
// cookiePolicy={'single_host_origin'}
isSignedIn={true}


/>
        </div>
    )
}
export default Login;