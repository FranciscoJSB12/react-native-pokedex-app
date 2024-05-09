import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <View>
      <Text>pokemon</Text>
      <Button
        icon='camera'
        mode='contained'
        onPress={() => console.log('Pressed')}
      >
        Press me
      </Button>
    </View>
  );
};
