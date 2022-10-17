import { TextField } from "@mui/material";
import { NumberFormatBase } from "react-number-format";

function MyCustomNumberFormat(props) {

  const format = (numStr) => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "UAH",
      maximumFractionDigits: 0
    }).format(numStr);
  };

  return <NumberFormatBase {...props} format={format} />;
}

export default function NumField({label, value, setValue}) {
  return (
      <>
        <MyCustomNumberFormat
          label={label}
          valueIsNumericString={true}
          customInput={TextField}
          value={value}
          onValueChange={(e) => setValue(e.value)} //! value without target ( e is object in this case)
        />
      </>      
  );
}
