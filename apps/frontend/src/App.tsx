import { MapComponent } from "./components/map";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ModeToggle></ModeToggle>
        <div className="h-100 w-200 m-4">
          <MapComponent />
        </div>
      </ThemeProvider>
    </TooltipProvider>
  );
}

export default App;
