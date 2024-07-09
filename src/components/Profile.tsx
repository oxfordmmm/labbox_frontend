/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAuth0 } from "@auth0/auth0-react";

import useAuth0Roles from "../utils/useAuth0Roles";
import usePrivateData from "../utils/usePrivateData";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { isLabBoxAdmin, isLabBoxEdit } = useAuth0Roles();
  const { data, isLoading, error } = usePrivateData();

  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;

  return (
    isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <h3>User Metadata</h3>
        {isLabBoxAdmin && <p>Role: LabBoxAdmin</p>}
        {isLabBoxEdit && <p>Role: LabBoxEdit</p>}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  );
}

export default Profile;
