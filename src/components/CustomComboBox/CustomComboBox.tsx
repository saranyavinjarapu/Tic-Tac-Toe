import { FC, useState } from "react";
import styles from "./CustomComboBox.module.css";
import { CustomComboBoxProps, customComboExpandProps } from "./types";
import arrowDropDown from "../../icons/arrow.svg";

export const CustomComboBox: FC<CustomComboBoxProps> = (props) => {
  const { comboOptions, comboName, defaultOption, onComboSelect } = props;
  const [comboOptionSelected, setComboOptionSelected] = useState<string>(
    `${defaultOption} X ${defaultOption}`
  );

  const [comboExpandStyle, setComboExpandStyle] =
    useState<customComboExpandProps>({
      arrowStyle: "",
      optionsContainerStyle: "",
    });

  const comboExpand = () => {
    let updatedStyle: customComboExpandProps =
      comboExpandStyle.arrowStyle === ""
        ? {
            arrowStyle: "comboBoxArrowExpanded",
            optionsContainerStyle: "optionsContainerActive",
          }
        : { arrowStyle: "", optionsContainerStyle: "" };

    setComboExpandStyle(updatedStyle);
  };

  const optionSelected = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let selectedValue = e.currentTarget.innerText;
    setComboOptionSelected(selectedValue);
    onComboSelect!(parseInt(selectedValue.split("X")[0]));

    setComboExpandStyle({
      arrowStyle: "",
      optionsContainerStyle: "",
    });
  };

  return (
    <div className={styles.selectBox}>
      <div
        id="optionsContainer"
        className={`${styles.optionsContainer} ${
          styles[`${comboExpandStyle.optionsContainerStyle}`]
        }`}
      >
        {comboOptions.map(function (comboOption: number, i: number) {
          return (
            <div
              id="option"
              key={i}
              className={styles.option}
              onClick={(e) => optionSelected(e)}
            >
              <input type="radio" className={styles.radio} name="combo-input" />
              <label>
                {comboOption} X {comboOption}
              </label>
            </div>
          );
        })}
      </div>
      <div
        id="selected"
        className={styles.selected}
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
          id="expandComboBoxArrow"
        />
      </div>
    </div>
  );
};
