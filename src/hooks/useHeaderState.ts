"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UseHeaderStateResult {
  pathname: string;
  isDrawerOpen: boolean;
  navbarShadow: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

const useHeaderState = (): UseHeaderStateResult => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    closeDrawer();
  }, [pathname, closeDrawer]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShadow(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const { documentElement, body } = document;

    if (isDrawerOpen) {
      documentElement.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      documentElement.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      documentElement.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return { pathname, isDrawerOpen, navbarShadow, toggleDrawer, closeDrawer };
};

export default useHeaderState;
