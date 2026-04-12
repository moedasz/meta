import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ScanPage from "./pages/ScanPage";
import ForensicReport from "./pages/ForensicReport";
import BootScreen from "./components/BootScreen";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/scan/:platform"} component={ScanPage} />
      <Route path={"/report/:platform"} component={ForensicReport} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Only show boot screen once per session
  const [booted, setBooted] = useState(() => {
    return sessionStorage.getItem("meta-scanner-booted") === "true";
  });

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem("meta-scanner-booted", "true");
    setBooted(true);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {!booted && <BootScreen onComplete={handleBootComplete} />}
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
