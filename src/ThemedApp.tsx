import { useTheme } from './contexts/ThemeContext';
import App from './App';

export default function ThemedApp() {
  const { theme } = useTheme();
  return <App key={theme} />; // Key forces re-render
}

// NO NEED. TO BE REMOVED