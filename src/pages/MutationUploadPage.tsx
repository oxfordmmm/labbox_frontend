import { withAuthenticationRequired } from "@auth0/auth0-react";

import Loading from "../components/Loading";
import MutationUpload from "../components/MutationUpload";

function MutationUploadPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center rounded-lg bg-background p-5 shadow-lg">
        <MutationUpload />
      </div>
    </div>
  );
}

export default withAuthenticationRequired(MutationUploadPage, {
  onRedirecting: () => <Loading />,
});
