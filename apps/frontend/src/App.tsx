import { MapComponent } from "./components/map";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ModeToggle></ModeToggle>
        <MapComponent />
      </ThemeProvider>
    </TooltipProvider>
  );
}

export default App;
