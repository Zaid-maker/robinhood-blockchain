import React, { createContext, useState, useEffect } from "react";

export const RobinhoodContext = createContext();

export const RobinhoodProvider = ({ children }) => {
  return <RobinhoodContext.Provider>{children}</RobinhoodContext.Provider>;
};
