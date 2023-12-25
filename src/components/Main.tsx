import React, { ReactNode } from "react";


export const Main = (props: { map: ReactNode; children: ReactNode }) => {
  return (
    <div>
      <h2>Main component</h2>

      {props.children}
      {props.map}
    </div>
  );
};
