import React from "react";

import * as styles from "./Sorts.module.scss";

const Sorts = props => {
    let statClass = [styles.SortType];
    if (props.isActive) {
        statClass.push(styles.Active);
    }
    return (
        <p className={statClass.join(' ')} onClick={props.clicked}>
            {props.sort}
        </p>
    );
};

export default Sorts;
