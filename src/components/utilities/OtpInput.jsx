import React, { useEffect, useRef, useState } from "react";

function OtpInput({ length = 4, onOtpSubmit }) {
  const [otpInputFields, setOtpInputFields] = useState(
    new Array(length).fill("")
  );

  const inputRefs = useRef([]);

  //   console.log(inputRefs, "refs");

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOtp = [...otpInputFields];
    // allow only one input value(single digit in one input cell)
    newOtp[index] = value.substring(value.length - 1);
    setOtpInputFields(newOtp);

    const enteredOtp = newOtp.join("");

    // trigger submit otp only when all the input fields are filled
    if (enteredOtp.length === length) onOtpSubmit(enteredOtp);

    // move to next field if current input is filled
    //  inputRefs.current[index + 1] written below is checking whether an input field exists after the current input field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputClick = (index) => {
    // below line handles the scenario: if a i/p field is already filled and
    // user wants to select that field(cursur is behind the old value present i.e, on the left side of old value), enter a new value then the entered new value should be taken instead of old value
    // by default it wont take bcz of value.substring(value.length - 1) present in input change fn . since it takes the last digit of that input value(right most value)

    // below line always sets the cursur to be present at the right most side of the i/p fieled
    inputRefs.current[index].setSelectionRange(1, 1);

    // if a previous field is empty then the cursor should move to that field when the user clicks on amy i/p field
    if (index > 0 && !otpInputFields[index - 1]) {
      inputRefs.current[otpInputFields.indexOf("")].focus();
    }
  };

  const handleInputKeydown = (index, e) => {
    // move to previous field if backspace key is pressed
    // !otpInputFields[index] checks returns true if current input field is empty
    if (
      e.key === "Backspace" &&
      !otpInputFields[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      {otpInputFields.map((each, index) => (
        <input
          className="w-12 h-10 text-center border border-slate-500 rounded-xl focus:outline-2 focus:outline-sky-600 text-black"
          key={index}
          ref={(input) => (inputRefs.current[index] = input)}
          type="text"
          value={each}
          onChange={(e) => handleInputChange(index, e)}
          onClick={() => handleInputClick(index)}
          onKeyDown={(e) => handleInputKeydown(index, e)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
