import React from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
  const [keyboardState, setKeyboardState] = React.useState({ visible: false, height: 0 });

  function dismiss() {
    Keyboard.dismiss();
    setKeyboardState((state) => {
      return {
        ...state,
        visible: false,
      };
    });
  }

  React.useEffect(() => {
    function onKeyboardShow(e) {
      setKeyboardState({
        visible: true,
        height: e.endCoordinates.height,
      });
    }

    function onKeyboardHide(e) {
      setKeyboardState({
        visible: false,
        height: e.endCoordinates.height,
      });
    }

    const showSub = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return [keyboardState, dismiss];
};
