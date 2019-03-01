import React from "react";

import * as styles from "./Sorts.module.scss";

const Sorts = props => {
    let statClass = [styles.SortType];
    if (props.isActive) {
        statClass.push(styles.Active);
    }
    let text = props.sort.toUpperCase();
    return (
        <p className={statClass.join(' ')} onClick={props.clicked}>
            {text}
        </p>
    );
};

export default Sorts;
