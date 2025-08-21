import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useAuthStore } from "~/stores/auth.store";
import { AUTH_ROUTES } from "../../routes.paths";

export const LogoutButton = () => {
  const { logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();

      navigate(AUTH_ROUTES.login);

    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      variant="destructive"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};
