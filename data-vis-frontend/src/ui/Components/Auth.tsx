import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex-row auth-wrapper-div">
      <div className="background-pattern">
        <div className="circle large"></div>
        <div className="circle medium"></div>
        <div className="circle small"></div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
