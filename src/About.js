import React from "react";
import { importMDX } from "mdx.macro";

const About = importMDX.sync("./markdown/about.md");

export default () => {
  return (
    <div className="md">
      <About />
    </div>
  );
};
