import { useAuth0 } from "@auth0/auth0-react";

interface LoginButtonProps {
  className: string;
}

function LogoutButton({ className }: LoginButtonProps) {
  const { logout, isAuthenticated } = useAuth0();

  const handleClick = () => {
    logout()
      .then(() => {
        console.log("Login successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    isAuthenticated && (
      <button className={className} type="button" onClick={handleClick}>
        Sign Out
      </button>
    )
  );
}

export default LogoutButton;
