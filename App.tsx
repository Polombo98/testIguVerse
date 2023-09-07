import "react-native-gesture-handler";
import CircleComponent from "@/Circle";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [sectionsAmount, setSectionsAmount] = useState("");
  const onChangeText = (text: string) => {
    setSectionsAmount(text.replace(/[^0-9]/g, ""));
  };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <GestureHandlerRootView style={styles.container}>
          <TextInput
            onChangeText={onChangeText}
            value={sectionsAmount}
            placeholder="Set amount of sections"
            keyboardType="numeric"
            style={styles.input}
          />
          <CircleComponent sectionsAmount={+sectionsAmount} />
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 50,
    width: 180,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
