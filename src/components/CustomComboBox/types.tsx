export type CustomComboOptionsType = {
  label: string;
  value: number;
};

export type CustomComboBoxProps = {
  comboOptions: CustomComboOptionsType[];
  comboName: string;
  defaultOption: string;
  onComboSelect: (value: number) => void;
};

export type customComboExpandProps = {
  arrowStyle: string;
  optionsContainerStyle: string;
};
