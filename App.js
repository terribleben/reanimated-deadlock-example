import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheet } from './BottomSheet';

const styles = StyleSheet.create({
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
});

const SheetHeader = () => (
  <View style={styles.header}>
    <Text>Drag me</Text>
  </View>
);

const SheetBody = () => (
  <View style={styles.body}>
    <Text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque fermentum dui faucibus in. Elit ut aliquam purus sit amet luctus venenatis. Vulputate sapien nec sagittis aliquam. Odio eu feugiat pretium nibh. Feugiat scelerisque varius morbi enim nunc faucibus. Et odio pellentesque diam volutpat commodo sed egestas. Ac orci phasellus egestas tellus rutrum tellus. Cursus metus aliquam eleifend mi. Morbi leo urna molestie at. Amet nisl purus in mollis nunc. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Dui accumsan sit amet nulla facilisi morbi tempus.
    </Text>
    <Text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque fermentum dui faucibus in. Elit ut aliquam purus sit amet luctus venenatis. Vulputate sapien nec sagittis aliquam. Odio eu feugiat pretium nibh. Feugiat scelerisque varius morbi enim nunc faucibus. Et odio pellentesque diam volutpat commodo sed egestas. Ac orci phasellus egestas tellus rutrum tellus. Cursus metus aliquam eleifend mi. Morbi leo urna molestie at. Amet nisl purus in mollis nunc. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Dui accumsan sit amet nulla facilisi morbi tempus.
    </Text>
  </View>
);

const App = () => {
  const [isOpen, _] = React.useState(true);
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <BottomSheet
          isOpen={isOpen}
          snapPoints={[100, 400]}
          renderHeader={() => <SheetHeader />}
          renderContent={() => <SheetBody />}
        />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
