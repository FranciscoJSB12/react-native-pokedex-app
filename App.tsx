import 'react-native-gesture-handler';
import { StackNavigator } from './src/navigator/StackNavigator';
import { ThemeContextProvider } from './src/presentation/context/ThemeContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <StackNavigator />
    </ThemeContextProvider>
  );
}
