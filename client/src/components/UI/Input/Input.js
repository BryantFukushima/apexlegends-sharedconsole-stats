import React from "react";

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
        case "time":
            inputElement = (
                <div>
                    <input
                        {...props.elemConfig.surviveMin.config}
                        value={props.elemConfig.surviveMin.value}
                        onChange={props.changed}
                    />
                    <input
                        {...props.elemConfig.surviveSec.config}
                        value={props.elemConfig.surviveSec.value}
                        onChange={props.changed}
                    />
                </div>
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
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
