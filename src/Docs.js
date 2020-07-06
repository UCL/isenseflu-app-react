import React from "react";
import { importMDX } from "mdx.macro";

const Docs = importMDX.sync("./markdown/docs.md");

export default () => {
  return (
    <div className="md">
      <Docs />
    </div>
  );
};
