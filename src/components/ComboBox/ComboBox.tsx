import { FC } from "react";
import styles from "./ComboBox.module.css";
import arrowDropDown from "../../icons/arrow.svg";

type ComboBoxProps = {
  comboOptions: Array<number>;
  comboName: string;
  onComboSelect?: (value: number) => void;
};

export const ComboBox: FC<ComboBoxProps> = (props) => {
  const { comboOptions, comboName, onComboSelect } = props;

  const comboExpand = () => {
    var isComboBoxExpanded = document.getElementById("expandComboBoxArrow")!
      .className!;
    var currentComboBoxClass = document.getElementById("expandComboBoxArrow");
    var currentOptionsContainerClass =
      document.getElementById("optionsContainer");

    if (isComboBoxExpanded) {
      currentOptionsContainerClass!.className = styles.optionsContainer;
      currentComboBoxClass!.className = "";
    } else {
      currentOptionsContainerClass!.className = styles.optionsContainerActive;
      currentComboBoxClass!.className = styles.comboBoxArrowExpanded;
    }
  };

  const optionSelected = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let selectedValue = e.currentTarget.innerText;

    document.querySelector("#comboValue")!.innerHTML =
      comboName.split("3")[0] + selectedValue;

    onComboSelect!(parseInt(selectedValue.split("X")[0]));

    var currentComboBoxClass = document.getElementById("expandComboBoxArrow");
    var currentOptionsContainerClass =
      document.getElementById("optionsContainer");

    currentOptionsContainerClass!.className = styles.optionsContainer;
    currentComboBoxClass!.className = "";
  };

  return (
    <div className={styles.selectBox}>
      <div id="optionsContainer" className={styles.optionsContainer}>
        {comboOptions.map(function (comboOption: any, i: any) {
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
        <span id="comboValue" className={styles.comboValue}>
          {comboName}
        </span>
        <img src={arrowDropDown} alt="search icon" id="expandComboBoxArrow" />
      </div>
    </div>
  );
};

export default ComboBox;
