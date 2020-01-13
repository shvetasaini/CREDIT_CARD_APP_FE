import React from 'react';

class Luhn extends React.Component {
  static valid(digitsString: string): boolean {
      digitsString = digitsString.replace(/\s/g, "");

      if (digitsString.length <= 1 || digitsString.match(/[^0-9 ]/)) {
          return false;
      }

      let checksum = Array.from(digitsString)
          .reverse()
          .map((char, index) => {
              let digit = Number(char);
              digit = index % 2 == 1 ? digit * 2 : digit;
              digit = digit > 9 ? digit - 9 : digit;
              return digit;
          })
          .reduce((previous, current) => previous + current);

      return checksum % 10 == 0;
  }
}

export default Luhn;