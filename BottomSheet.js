import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EASING_CONFIG = {
  duration: 250,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

const SWIPE_MIN_VELOCITY = 128;
const SWIPE_MIN_DISTANCE = 64;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
});

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const BottomSheet = ({
  isOpen = false,
  snapPoints = [32, 256],
  initialSnap = 0,
  renderHeader = () => null,
  renderContent = () => null,
  contentKey = 'content',
  scrollViewRef = null,
  onClose,
  onCloseEnd,
  onOpenEnd,
  onSnap,
  style = {},
}) => {
  const insets = useSafeAreaInsets();
  let lastSnap = React.useRef(initialSnap);

  // translation from bottom of the screen
  let snapY = useSharedValue(SCREEN_HEIGHT);
  let gestureInitialY = useSharedValue(0);
  const [containerHeight, setContainerHeight] = React.useState(0);

  const animatedTopYStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: snapY.value }],
  }));

  const onSnapToAnimationFinished = React.useCallback(
    (onFinished, newContainerHeight) => {
      if (onFinished) {
        onFinished();
      }
      if (containerHeight > newContainerHeight) {
        setContainerHeight(newContainerHeight);
      }
    },
    [containerHeight, setContainerHeight]
  );

  const snapTo = React.useCallback(
    (toValue, velocity = 0, onFinished) => {
      // containerHeight < 1 causes layout bugs on Android.
      const newContainerHeight = Math.max(1, SCREEN_HEIGHT - toValue);
      if (containerHeight < newContainerHeight) {
        setContainerHeight(newContainerHeight);
      }
      snapY.value = withTiming(toValue, EASING_CONFIG, (finished) => {
        if (finished) {
          runOnJS(onSnapToAnimationFinished)(onFinished, newContainerHeight);
        }
      });
    },
    [snapY, containerHeight, setContainerHeight, onSnapToAnimationFinished]
  );

  const snapToClosest = React.useCallback(
    (y, velocity) => {
      let minDist = 9999,
        minIndex = -1;
      for (let ii = 0; ii < snapPoints.length; ii++) {
        let dist = Math.abs(SCREEN_HEIGHT - snapPoints[ii] - y);
        if (dist < minDist) {
          minDist = dist;
          minIndex = ii;
        }
      }
      const signDist = y - (SCREEN_HEIGHT - snapPoints[minIndex]);
      if (
        signDist < -SWIPE_MIN_DISTANCE &&
        velocity < -SWIPE_MIN_VELOCITY &&
        minIndex < snapPoints.length - 1
      ) {
        minIndex += 1;
      } else if (signDist > SWIPE_MIN_DISTANCE && velocity > SWIPE_MIN_VELOCITY && minIndex > 0) {
        minIndex -= 1;
      }
      lastSnap.current = minIndex;
      if (isOpen) {
        onSnap && onSnap(minIndex);
      }
      return snapTo(SCREEN_HEIGHT - snapPoints[minIndex], velocity);
    },
    [snapTo, snapPoints, onSnap, isOpen]
  );

  React.useEffect(() => {
    if (isOpen) {
      snapTo(SCREEN_HEIGHT - snapPoints[lastSnap.current], 0, onOpenEnd);
      onSnap && onSnap(lastSnap.current);
    } else {

      snapTo(SCREEN_HEIGHT, 0, onCloseEnd);
      onSnap && onSnap(0);
    }
  }, [isOpen, onOpenEnd, onCloseEnd, onSnap, snapPoints, snapTo]);

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      gestureInitialY.value = e.absoluteY - e.y;
      snapY.value = e.translationY + gestureInitialY.value;
    })
    .onUpdate((e) => {
      snapY.value = e.translationY + gestureInitialY.value;
    })
    .onEnd((e) => {
      const { absoluteY, velocityY } = e;
      runOnJS(snapToClosest)(absoluteY, velocityY);
    });

  return (
    <Animated.View style={[styles.container, style, animatedTopYStyle]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View>{renderHeader()}</Animated.View>
      </GestureDetector>
      <ScrollView
        ref={scrollViewRef}
        key={contentKey}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {renderContent()}
        {/* Bottom padding constrains the height of the scrollview to the visible height of the sheet.  */}
        <View style={{ paddingBottom: SCREEN_HEIGHT - containerHeight - insets.top }} />
      </ScrollView>
    </Animated.View>
  );
};
