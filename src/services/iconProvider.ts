const iconProvider = (
  // icon pack data
  iconPack: (
    width: number,
    height: number,
  ) => {name: string; icon: JSX.Element}[],
  //icon name
  iconName: string,
  // icon width
  width: number,
  // icon height
  height: number,
) => {
  // return a icon that you need
  return iconPack(width, height).find(icon => {
    return icon.name === iconName && icon.icon;
  });
};

export default iconProvider;
