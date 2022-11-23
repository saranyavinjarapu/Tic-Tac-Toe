import React, { FC, useState } from "react";
import styles from "./CustomComboBox.module.css";
import { CustomComboBoxProps, customComboExpandProps } from "./types";
import arrowDropDown from "../../icons/arrow.svg";

const CustomComboBox: FC<CustomComboBoxProps> = (props) => {
  const { comboOptions, comboName, defaultOption, onComboSelect } = props;
  const [comboOptionSelected, setComboOptionSelected] = useState<string>(
    `${defaultOption} X ${defaultOption}`
  );

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

  const optionSelected = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectedValue = e.currentTarget.innerText;
    setComboOptionSelected(selectedValue);
    onComboSelect(Number(selectedValue.split("X")[0]));

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
        {comboOptions.map((comboOption: number) => (
          <div
            key={comboOption}
            role="presentation"
            className={styles.option}
            onClick={(e) => optionSelected(e)}
          >
            <input type="radio" className={styles.radio} name="combo-input" />
            <label htmlFor="combo-option">
              {comboOption} X {comboOption}
            </label>
          </div>
        ))}
      </div>
      <div
        className={styles.selected}
        role="presentation"
        onClick={() => comboExpand()}
      >
        <span className={styles.comboValue}>
          {comboName} : {comboOptionSelected}
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
