import GoogleLogin from "react-google-login";

const clientId =
  "699412387887-1pae7suk9l9bstfdaer6826gjc118k0m.apps.googleusercontent.com";
  function useAuth0() {
 
        gravatar: string;
        getAccessToken: () => Promise<void>;
        accessToken: string;
      }
    
 
    
      const [accessToken, setAccessToken] = useState("");
    
 
    
      async function getAccessToken(): Promise<void> {
        try {
          const token = await auth0Client?.getTokenSilently();
          setAccessToken(token);
        } catch (e) {
          console.log(e);
        }
      }
    
    ...
    
      return {
    ...
        accessToken,
        getAccessToken,
      };
function Login() {
    
  const onSuccess = (res) => {
    console.log("sucess login", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("failed login", res);
  };
  return (
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
  );
}
export default Login;
