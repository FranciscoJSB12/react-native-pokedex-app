import ImageColors from 'react-native-image-colors';

export const getColorFromImage = async (image: string) => {
  const fallbackColor = 'grey';

  const colors = await ImageColors.getColors(image, {
    fallback: fallbackColor,
    //IMPORTANTE: el fallback será el color en caso de que no se pueda determinar el correpondiente a la imagen
  });

  switch (colors.platform) {
    case 'android':
      return colors.dominant ?? fallbackColor;

    case 'ios':
      return colors.background ?? fallbackColor;

    default:
      return fallbackColor;
  }
};
