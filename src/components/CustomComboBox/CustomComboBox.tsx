import { FC, useState } from "react";
import styles from "./CustomComboBox.module.css";
import {
  CustomComboBoxProps,
  CustomComboOptionsType,
  customComboExpandProps
} from "./types";
import arrowDropDown from "../../icons/arrow.svg";

const CustomComboBox: FC<CustomComboBoxProps> = (props) => {
  const { comboOptions, comboName, defaultOption, onComboSelect } = props;
  const [comboOptionSelectedLabel, setComboOptionSelectedLabel] =
    useState<string>(`${defaultOption}`);

  const [comboExpandStyle, setComboExpandStyle] =
    useState<customComboExpandProps>({
      arrowStyle: "",
      optionsContainerStyle: ""
    });

  const comboExpand = () => {
    const updatedStyle: customComboExpandProps =
      comboExpandStyle.arrowStyle === ""
        ? {
            arrowStyle: "comboBoxArrowExpanded",
            optionsContainerStyle: "optionsContainerActive"
          }
        : { arrowStyle: "", optionsContainerStyle: "" };

    setComboExpandStyle(updatedStyle);
  };

  const optionSelected = (
    optionSelectedvalue: number,
    optionSelectedLabel: string
  ) => {
    onComboSelect(Number(optionSelectedvalue));
    setComboOptionSelectedLabel(optionSelectedLabel);

    setComboExpandStyle({
      arrowStyle: "",
      optionsContainerStyle: ""
    });
  };

  return (
    <div className={styles.selectBox}>
      <div
        className={`${styles.optionsContainer} ${
          styles[`${comboExpandStyle.optionsContainerStyle}`]
        }`}
      >
        {comboOptions.map((comboOption: CustomComboOptionsType) => (
          <div
            key={comboOption.value}
            role="presentation"
            className={styles.option}
            onClick={() => optionSelected(comboOption.value, comboOption.label)}
          >
            <input
              type="radio"
              value={comboOption.value}
              className={styles.radio}
              name="combo-input"
            />
            <label htmlFor="combo-option">{comboOption.label}</label>
          </div>
        ))}
      </div>
      <div
        className={styles.selected}
        role="presentation"
        onClick={() => comboExpand()}
      >
        <span className={styles.comboValue}>
          {comboName} : {comboOptionSelectedLabel}
        </span>
        <img
          src={arrowDropDown}
          alt="combo expand"
          className={`${styles.comboBoxArrow} ${
            styles[`${comboExpandStyle.arrowStyle}`]
          }`}
        />
      </div>
    </div>
  );
};

export default CustomComboBox;
