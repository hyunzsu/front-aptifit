"use client";

import { useState, useEffect } from "react";
import { getFromSessionStorage } from "@/lib/utils";

export default function useAccessToken() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getFromSessionStorage("access_token")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
}
