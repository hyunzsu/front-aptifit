"use client";

import { useState, useEffect } from "react";
import { checkAccessToken } from "@/lib/utils";

export default function useAccessToken() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (checkAccessToken()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
}
