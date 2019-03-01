import React from "react";

import * as styles from './Input.module.scss';

const input = props => {
    let inputElement = null;
    switch (props.elemType) {
        case "input":
            inputElement = (
                <input
                    {...props.elemConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case "select":
            inputElement = (
                <select value={props.value} onChange={props.changed}>
                    {props.elemConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.placeholder}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    {...props.elemConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }
    return (
        
        <div className={styles[props.classes]}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
