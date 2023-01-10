import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Calculator from "./src/Calculator";

export default function App() {
  const [input, setInput] = useState(0); // 2
  const [currentOperator, setCurrentOperator] = useState(null); // +
  const [result, setResult] = useState(null); // 12
  const [tempInput, setTempInput] = useState(null); // 2 없을때는 null로 초기값 잡기
  const [tempOperator, setTempOperator] = useState(null); // +

  return (
    <SafeAreaView style={styles.container}>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
