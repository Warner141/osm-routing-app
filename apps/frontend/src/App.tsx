import { ModeToggle } from "./@/components/mode-toggle";
import { ThemeProvider } from "./@/components/theme-provider";
import { TooltipProvider } from "./@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ModeToggle></ModeToggle>
      </ThemeProvider>
    </TooltipProvider>
  );
}

export default App;
