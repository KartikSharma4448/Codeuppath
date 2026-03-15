import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Profile() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
}
