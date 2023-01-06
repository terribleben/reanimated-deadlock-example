import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheet } from './BottomSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 64,
    backgroundColor: '#f00',
    alignItems: 'center',
    padding: 16,
  },
  body: {
    backgroundColor: '#0f0',
    padding: 16,
  },
  button: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderColor: '#000',
    padding: 8,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 16,
  },
});

const SheetHeader = () => (
  <View style={styles.header}>
    <Text>Drag me</Text>
  </View>
);

// set `numParagraphs` to a large number to cause an expensive render
const SheetBody = () => {
  const [numParagraphs, setRandomNumParagraphs] = React.useReducer(
    (state) => Math.floor(Math.random() * 999),
    4
  );
  const p = Array(numParagraphs).fill(0);
  
  return (
    <View style={styles.body}>
      <Pressable onPress={setRandomNumParagraphs} style={styles.button}>
        <Text>Render random number of paragraphs</Text>
      </Pressable>
      {p.map((_, ii) => (
        <Text key={ii} style={styles.paragraph}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque fermentum dui faucibus in. Elit ut aliquam purus sit amet luctus venenatis. Vulputate sapien nec sagittis aliquam. Odio eu feugiat pretium nibh. Feugiat scelerisque varius morbi enim nunc faucibus. Et odio pellentesque diam volutpat commodo sed egestas. Ac orci phasellus egestas tellus rutrum tellus. Cursus metus aliquam eleifend mi. Morbi leo urna molestie at. Amet nisl purus in mollis nunc. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Dui accumsan sit amet nulla facilisi morbi tempus.
        </Text>
      ))}
    </View>
  );
}

const App = () => {
  const [isOpen, toggleIsOpen] = React.useReducer((state) => (!state), false);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Pressable onPress={toggleIsOpen}>
          <Text>Open/close sheet</Text>
        </Pressable>
        <BottomSheet
          isOpen={isOpen}
          snapPoints={[100, 400, 700]}
          renderHeader={() => <SheetHeader />}
          renderContent={() => <SheetBody />}
        />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
