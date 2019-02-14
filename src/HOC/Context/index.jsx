import React from "react";

const Context = (context = () => null) => WrappedComponent => props => {
  const { Consumer } = context();
  return <Consumer>{ctx => <WrappedComponent {...props} {...ctx} />}</Consumer>;
};

export default Context;
