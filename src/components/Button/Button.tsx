import React from "react";

import { button } from "./Button.css";

const Button = ({ children, ...props }: React.ComponentProps<"button">) => (
  <button className={button} {...props}>
    {children}
  </button>
);

Button.displayName = "Button";

export default Button;
