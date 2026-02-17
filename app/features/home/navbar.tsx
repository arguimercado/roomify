import {Box, BoxIcon} from "lucide-react";
import { Button } from 'components/ui/button';
import {useOutletContext} from "react-router";

const Navbar = () => {

  const {isSignedIn,userName,signIn,signOut} = useOutletContext<AuthContext>();
  
  const handleAuthClick = async() => {
    if(isSignedIn) {
      try {
        await signOut();
      }
      catch(er) {
        console.log(er);
      }

      return;
    }

    try {
      await signIn();
    }
    catch(e) {
      console.log(e);
    }
  }
  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <BoxIcon className="logo" />
            <span className="name">Roomify</span>
          </div>
          <ul className="links">
            <a href={"#"}>Product</a>
            <a href={"#"}>Pricing</a>
            <a href={"#"}>Community</a>
            <a href={"#"}>Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">{userName ? `Hi, ${userName}` : "Signed In"}</span>
              <Button size="sm" onClick={handleAuthClick} variant={"ghost"} className="btn">
                Log Out
              </Button>
            </>
            ) : (
            <>
            <Button size="sm" variant={"ghost"} onClick={handleAuthClick} className="login">
              Log In
            </Button>
            <a href="#upload" className="cta">Get Started</a>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
export default Navbar
