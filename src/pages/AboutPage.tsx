import { withAuthenticationRequired } from "@auth0/auth0-react";

import Loading from "../components/Loading";
import Profile from "../components/Profile";

function AboutPage() {
  return (
    <>
      <div>AboutPage</div>
      <Profile />
    </>
  );
}

export default withAuthenticationRequired(AboutPage, {
  onRedirecting: () => <Loading />,
});
