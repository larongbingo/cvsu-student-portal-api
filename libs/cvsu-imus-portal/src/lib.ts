export function RemoveSpecialCharsOnStringNum(stringNumber: string) {
  let res = "";
  if (stringNumber) {
    for (const char of stringNumber) {
      if ((char >= "0" && char <= "9") || char === ".") {
        res += char;
      }
    }
  } else {
    res = "0";
  }
  return Number(res);
}
