import { useState, useEffect } from "react";
import App from "./App.jsx";
import ComparePage from "./ComparePage.jsx";

export default function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <>
      {currentPath === "/" && <App navigate={navigate} />}
      {currentPath === "/compare" && <ComparePage navigate={navigate} />}
    </>
  );
}
