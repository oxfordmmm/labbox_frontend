import { useAuth0 } from "@auth0/auth0-react";

interface LoginButtonProps {
  className: string;
}

function LoginButton({ className }: LoginButtonProps) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleClick = () => {
    loginWithRedirect()
      .then(() => {
        console.log("Login successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    !isAuthenticated && (
      <button type="button" className={className} onClick={handleClick}>
        Sign In
      </button>
    )
  );
}

export default LoginButton;
