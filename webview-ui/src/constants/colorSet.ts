export enum ColorSetEnum {
  gray,
  dark,
  success,
  warning,
  error,
  info,
  lab,
  light,
  note,
  darkSkeleton,
  darkerSkeleton,
  gitlab,
}

export type ColorSet = {
  backgroundColor: string;
  color: string;
};

export const getColorSet = (colorSetEnum: ColorSetEnum) => {
  switch (+colorSetEnum) {
    case ColorSetEnum.gray:
      return { backgroundColor: '#F5F5F5', color: '#66676B' };
    case ColorSetEnum.info:
      return { backgroundColor: '#00B1D2', color: '#ffffff' };
    case ColorSetEnum.dark:
      return { backgroundColor: '#66676B', color: '#ffffff' };
    case ColorSetEnum.success:
      return { backgroundColor: '#00D6A0', color: '#ffffff' };
    case ColorSetEnum.warning:
      return { backgroundColor: '#FF8845', color: '#ffffff' };
    case ColorSetEnum.error:
      return { backgroundColor: '#ff3838', color: '#ffffff' };
    case ColorSetEnum.light:
      return { backgroundColor: '#ffffff', color: '#076E81' };
    case ColorSetEnum.darkSkeleton:
      return { backgroundColor: '#121212', color: '#444444' };
    case ColorSetEnum.darkerSkeleton:
      return { backgroundColor: '#02191E', color: '#F5F5F5' };
    case ColorSetEnum.gitlab:
      return { backgroundColor: '#404040', color: '#868686' };
  }
};

export const getRGBAColorSet = (
  colorSetEnum: ColorSetEnum,
  opacity: string,
) => {
  switch (+colorSetEnum) {
    case ColorSetEnum.gray:
      return {
        backgroundColor: 'rgba(245, 245, 245, ' + opacity + ')',
        color: '#66676B',
      };
    case ColorSetEnum.info:
      return {
        backgroundColor: 'rgba(0, 177, 210, ' + opacity + ')',
        color: '#F5F5F5',
      };
    case ColorSetEnum.lab:
      return {
        backgroundColor: 'rgba(151, 71, 255, ' + opacity + ')',
        color: '#F5F5F5',
      };
    case ColorSetEnum.note:
      return {
        backgroundColor: 'rgba(7, 110, 129, ' + opacity + ')',
        color: '#F5F5F5',
      };
    case ColorSetEnum.dark:
      return {
        backgroundColor: 'rgba(102, 103, 107, ' + opacity + ')',
        color: '#F5F5F5',
      };
    case ColorSetEnum.success:
      return {
        backgroundColor: 'rgba(0, 214, 160, ' + opacity + ')',
        color: '#F5F5F5',
      };
    case ColorSetEnum.warning:
      return {
        backgroundColor: 'rgba(255, 136, 69, ' + opacity + ')',
        color: '#F5F5F5',
      };
    case ColorSetEnum.error:
      return {
        backgroundColor: 'rgba(255, 56, 56, ' + opacity + ')',
        color: '#F5F5F5',
      };
    case ColorSetEnum.light:
      return {
        backgroundColor: 'rgba(255, 255, 255, ' + opacity + ')',
        color: '#024956',
      };
  }
};
