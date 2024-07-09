import { withAuthenticationRequired } from "@auth0/auth0-react";

import ExcelUpload from "../components/ExcelUpload";
import Loading from "../components/Loading";

function SpreadsheetUploadPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center rounded-lg bg-background p-5 shadow-lg">
        <ExcelUpload
          worksheetsToConvert={["Runs", "Specimens", "Samples", "Storage"]}
          // state={state}
        />
      </div>
    </div>
  );
}

export default withAuthenticationRequired(SpreadsheetUploadPage, {
  onRedirecting: () => <Loading />,
});
