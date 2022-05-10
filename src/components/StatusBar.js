import React, { useState } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import COLORS from './styled-components/Colors';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

//console.log(StatusBar.currentHeight);

const Statusbar = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    //marginTop: StatusBar.currentHeight
  },
  buttonsContainer: {
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8
  }
});

export default Statusbar;