export type CustomComboBoxProps = {
  comboOptions: Array<number>;
  comboName: string;
  defaultOption: number;
  onComboSelect: (value: number) => void;
};

export type customComboExpandProps = {
  arrowStyle: string;
  optionsContainerStyle: string;
};
