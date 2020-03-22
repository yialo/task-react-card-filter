const getWrappedComponentName = (WrappedComponent) => {
  return WrappedComponent.displayName
    ?? WrappedComponent.name
    ?? 'Component';
};

export default (hocNameBase, getWrapperComponent) => {
  return (WrappedComponent, ...args) => {
    const WrapperComponent = getWrapperComponent(WrappedComponent, ...args);
    const wrappedComponentName = getWrappedComponentName(WrappedComponent);
    WrapperComponent.displayName = `with${hocNameBase}(${wrappedComponentName})`;
    return WrapperComponent;
  };
};
