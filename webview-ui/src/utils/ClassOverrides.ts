export type ClassOverrides = {
  /**
   * Classname to add or override
   */
  classOverrides?: Array<string | boolean>;
};

export type BgColor =
  | 'bg-primary-default'
  | 'bg-secondary-semi-light'
  | 'bg-secondary-default'
  | 'bg-secondary-default-high-opacity'
  | 'bg-secondary-dark'
  | 'bg-secondary-darkest'
  | 'bg-gray-input'
  | 'bg-gray-primary'
  | 'bg-gray-secondary'
  | 'bg-gray-third'
  | 'bg-white'
  | 'bg-red-700'
  | 'bg-default-high-opacity'
  | 'bg-red-alert'
  | 'bg-orange-warning'
  | 'bg-green-pearl'
  | 'bg-orange-info'
  | 'bg-primary-blue'
  | 'dark:bg-primary-default'
  | 'dark:bg-secondary-default'
  | 'dark:bg-secondary-default-high-opacity'
  | 'dark:bg-secondary-default-medium-opacity'
  | 'bg-secondary-default-low-opacity'
  | 'dark:bg-dark-primary'
  | 'dark:bg-gray-third'
  | 'bg-secondary-default dark:bg-gray-primary'
  | 'bg-gray-input dark:bg-secondary-dark'
  | 'bg-secondary-semi-light dark:bg-gray-third'
  | 'bg-gitlab-input'
  | 'bg-gitlab-button'
  | 'bg-gitlab-content'
  | 'bg-transparent'
  | 'bg-secondary-dark dark:bg-gray-third'
  | 'dark:bg-primary-lightest'
  | 'bg-gray-input dark:bg-dark-third'
  | 'bg-gray-input dark:bg-dark-secondary'
  | '#F5F5F5';

export type HoverBgColor =
  | 'hover:bg-primary-default'
  | 'hover:bg-secondary-semi-light'
  | 'hover:bg-secondary-default'
  | 'hover:bg-secondary-dark';

export type TextColor =
  | 'text-white'
  | 'text-black'
  | 'text-primary-default'
  | 'text-secondary-default'
  | 'text-secondary-dark'
  | 'text-gray-primary'
  | 'text-gray-secondary'
  | 'text-red-alert'
  | 'text-green-pearl'
  | 'dark:text-gray-primary'
  | 'text-orange-warning'
  | 'text-secondary-default dark:text-dark-primary'
  | 'text-gray-secondary dark:text-gray-primary'
  | 'text-secondary-default'
  | 'text-gray-input'
  | 'text-secondary-default dark:text-gray-primary'
  | 'text-gray-input dark:text-gray-secondary'
  | 'text-gray-secondary dark:text-gray-secondary'
  | 'text-secondary-default-high-opacity'
  | 'text-gray-primary dark:text-gray-secondary'
  | 'dark:text-gray-primary text-gray-secondary'
  | '#66676B';

export type DarkModeTextColor =
  | 'dark:text-gray-primary'
  | 'dark:text-secondary-dark';

export type DivideColor = 'divide-secondary-default' | 'divide-red-alert';

export type Margin =
  | 'm-0'
  | 'm-px'
  | 'm-0.5'
  | 'm-1'
  | 'm-1.5'
  | 'm-2'
  | 'm-2.5'
  | 'm-3'
  | 'm-3.5'
  | 'm-4'
  | 'm-5'
  | 'm-6'
  | 'm-7'
  | 'm-8'
  | 'm-9'
  | 'm-10'
  | 'm-11'
  | 'm-12'
  | 'm-14'
  | 'm-16'
  | 'm-20'
  | 'm-24'
  | 'm-28'
  | 'm-32'
  | 'm-36'
  | 'm-40'
  | 'm-44'
  | 'm-48'
  | 'm-52'
  | 'm-56'
  | 'm-60'
  | 'm-64'
  | 'm-72'
  | 'm-80'
  | 'm-96'
  | 'm-auto';

export type Rounded = 'rounded-2xl' | 'rounded-2lg' | 'rounded-lg' | 'rounded';

export type PlaceholderColor =
  | 'placeholder-secondary-default'
  | 'placeholder-input-field'
  | 'placeholder-white'
  | 'placeholder-gray-primary'
  | 'placeholder-gray-secondary';

export type BorderColor =
  | 'border-primary-default'
  | 'border-secondary-default'
  | 'border-none'
  | 'border-transparent'
  | 'border-gitlab-border'
  | 'border-gitlab-active';

/**
 * Basic html styling type
 */
export type HTMLStyling = {
  /**
   * Text color
   */
  color?: TextColor;
  /**
   * Background color
   */
  bgColor?: BgColor;
  borderColor?: BorderColor;
  /**
   * Bold text isn't compatible with light
   * @see HTMLStyling.light
   */
  bold?: boolean;
  /**
   * Light text isn't compatible with bold
   * @see HTMLStyling.bold
   */
  light?: boolean;
  italic?: boolean;
  /**
   * Font used
   */
  font?: 'ubuntu' | 'comfortaa';
  placeholderColor?: PlaceholderColor;
  /**
   * Put content in uppercase
   */
  uppercase?: boolean;
  /**
   * Rounded radius
   */
  rounded?: string;
};

/**
 * Generic type for resizing a component (image...)
 */
export type Sizing = {
  /**
   * Width can either be in px or %
   */
  width?: string;

  /**
   * Height can either be in px or %
   */
  height?: string;
};

export type Size =
  | 'xs'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';
