/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAuth0 } from "@auth0/auth0-react";

interface UseAuth0RolesResponse {
  isLabBoxAdmin: boolean;
  isLabBoxEdit: boolean;
}

function useAuth0Roles(): UseAuth0RolesResponse {
  const { user } = useAuth0();
  const roles: string[] = user
    ? user[`${import.meta.env.VITE_APP_AUTH0_AUDIENCE}/roles`]
    : [];

  return {
    isLabBoxAdmin: roles.includes("LabBoxAdmin"),
    isLabBoxEdit: roles.includes("LabBoxEdit"),
  };
}

export default useAuth0Roles;
