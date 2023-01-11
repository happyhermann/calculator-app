import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const COLOR = {
  RESULT: "#4e4c51",
  RESET: "#5f5e62",
  OPERATOR: "#f39c29",
  NUM: "#5c5674",
};

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSelected }) => {
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
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: "black",
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  /* padding: 5px; // top, right, bottom, left */
  padding: 10px 5px; // top,bottom(vertical), left,right(horizontal)
  /* padding: 1px 2px 3px 4px; // top right botoom left */
`;

export default () => {
  const [input, setInput] = useState(0); // 2 -> 14
  const [currentOperator, setCurrentOperator] = useState(null); // + -> null
  const [result, setResult] = useState(null); // 12 -> 14
  const [tempInput, setTempInput] = useState(null); // 2
  const [tempOperator, setTempOperator] = useState(null); // +

  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClikcedEqual] = useState(false);
  //   issue : 연산자 이후 두 번째 num를 한 자리수 밖에 입력 못하는 에러 있었음

  //   const hasInput = input ? true : false;
  const hasInput = !!input;
  //   !! 어떠한 값을 Boolean값으로 변경하고자하면 !!를 쓰면 된다. 삼항연산자보다 가독성이 좋다

  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      // 연산자가 들어갔을 때
      // 1. result state 값에 input 값 저장
      // 2. setInput에 들어온 숫자가 들어감

      //   operator를 직전에 클릭을 해서 한 자리 수로 바꿔 줄때 연산자가 직전에 눌리지 않았다는 뜻으로
      // 다시 isClikedOperator를 false로 초기화를 시켜줘야함
    } else {
      // const newInput = input + num // bad case
      const newInput = Number(`${input}${num}`); // good case
      //숫자화
      setInput(newInput);
      //   연산자전 숫자 입력 할 때
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== "=") {
      setCurrentOperator(operator);
      setIsClickedOperator(true);
      //   isCliked를 true로 만드는 순간이 있어야한다. '='이 아닐때 true여야한다.
      setIsClikcedEqual(false);
      //   '='이 아닐때는 false로

      //   "="이 들어오기전에는 CurrentOperator에 operator 넣기
    } else {
      let finalResult = result;
      // 마지막 결과 변수 선언
      const finalInput = isClickedEqual ? tempInput : input;
      //   직전에 '='이 누르면 tempInput에 들어가고 아닐때는 그냥 input에 들어간다
      const finalOperator = isClickedEqual ? tempOperator : currentOperator;

      switch (currentOperator) {
        case "+":
          finalResult = result + finalInput;
          break;
        case "-":
          finalResult = result - finalInput;
          break;
          4;
        case "*":
          finalResult = result * finalInput;
          break;
        case "/":
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      // 연산자 버튼을 누르고   operator가 들어오면 case에 따라서 finalResult 계산 후 값을 할당함
      setResult(finalResult);
      setInput(finalResult);
      // 계산을 거친 finalResult는 최종적으로
      // 1. result에 state값으로 들어감
      // 2. setInput에 state값으로 들어감
      setTempInput(finalInput);
      setTempOperator(finalOperator);
      setIsClikcedEqual(false);
      //   '='이었을때는 true로 (equal을 클릭했었다)
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
      //   인풋 값이 있을때는 현재 Input값만 비워주기 (0으로만 바꿔주기)
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };

  return (
    <View style={{ flex: 1, width: 250, justifyContent: "center" }}>
      <Text>input: {input}</Text>
      <Text>currentOperator: {currentOperator}</Text>
      <Text>result: {result}</Text>
      <Text>tempInput: {tempInput}</Text>
      <Text>tempOperator: {tempOperator}</Text>

      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: "white", fontSize: 35, textAlign: "right" }}>
          {input}
        </Text>
      </InputContainer>

      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button
          type="reset"
          text={hasInput ? "C" : "AC"}
          onPress={onPressReset}
          flex={3}
        />
        <Button
          type="operator"
          text="/"
          onPress={() => onPressOperator("/")}
          flex={1}
          isSelected={currentOperator === "/"}
        />
      </ButtonContainer>

      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7, 8, 9].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="*"
          onPress={() => onPressOperator("*")}
          flex={1}
          isSelected={currentOperator === "*"}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="-"
          onPress={() => onPressOperator("-")}
          flex={1}
          isSelected={currentOperator === "-"}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num) => (
          <Button
            key={`num-${num}`}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="+"
          onPress={() => onPressOperator("+")}
          flex={1}
          isSelected={currentOperator === "+"}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button type="num" text="0" onPress={() => onPressNum(0)} flex={3} />
        <Button
          type="operator"
          text="="
          onPress={() => onPressOperator("=")}
          flex={1}
        />
      </ButtonContainer>
    </View>
  );
};
