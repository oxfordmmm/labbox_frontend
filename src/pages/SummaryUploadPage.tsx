import { withAuthenticationRequired } from "@auth0/auth0-react";

import Loading from "../components/Loading";
import SummaryUpload from "../components/SummaryUpload";

function SummaryUploadPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center rounded-lg bg-background p-5 shadow-lg">
        <SummaryUpload />
      </div>
    </div>
  );
}

export default withAuthenticationRequired(SummaryUploadPage, {
  onRedirecting: () => <Loading />,
});
