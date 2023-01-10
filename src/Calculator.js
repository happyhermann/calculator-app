import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";

// Button type : 'reset | 'operator' | 'num
const Button = ({ text, onPress, flex, type }) => {
  const backgroundColor =
    type === "reset"
      ? COLOR.RESET
      : type === "operator"
      ? COLOR.OPERATOR
      : type === "num"
      ? COLOR.NUM
      : "transparent";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        // paddingVertical: 15
        height: 50,
        // 상하 크기를 결정하는 두 가지 방법
        borderWidth: 0.2,
        borderColor: "black",
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const COLOR = {
  RESULT: "#4e4c51",
  RESET: "#5f5e62",
  OPERATOR: "#f39c29",
  NUM: "#5c5674",
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export default () => {
  return (
    <View style={{ flex: 1, width: 250 }}>
      {/* 결과 */}

      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button type="reset" text="AC" onPress={() => null} flex={3} />
        <Button type="operator" text="/" onPress={() => null} flex={1} />
      </ButtonContainer>
      {/* 3:1 비율  */}

      {/* [7 ~ x] */}

      <ButtonContainer>
        <Button type="num" text="7" onPress={() => null} flex={1} />
        <Button type="num" text="8" onPress={() => null} flex={1} />
        <Button type="num" text="9" onPress={() => null} flex={1} />
        <Button type="operator" text="X" onPress={() => null} flex={1} />
      </ButtonContainer>
      {/* 동일한 비율 */}

      {/* [4 ~ -] */}

      <ButtonContainer>
        <Button type="num" text="4" onPress={() => null} flex={1} />
        <Button type="num" text="5" onPress={() => null} flex={1} />
        <Button type="num" text="6" onPress={() => null} flex={1} />
        <Button type="operator" text="-" onPress={() => null} flex={1} />
      </ButtonContainer>

      {/* [1 ~ +] */}

      <ButtonContainer>
        <Button type="num" text="1" onPress={() => null} flex={1} />
        <Button type="num" text="2" onPress={() => null} flex={1} />
        <Button type="num" text="3" onPress={() => null} flex={1} />
        <Button type="operator" text="+" onPress={() => null} flex={1} />
      </ButtonContainer>

      {/* [0 ~ =] */}

      <ButtonContainer>
        <Button type="num" text="0" onPress={() => null} flex={3} />
        <Button type="operator" text="=" onPress={() => null} flex={1} />
      </ButtonContainer>
    </View>
  );
};
