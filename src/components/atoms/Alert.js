import React from "react";



function Alert({ children, type, title }) {
    return (
        <div className={`uk-alert uk-alert-${type || 'warning'}`}>
            <strong>{title}</strong>
            {children}
        </div>
    );
}

export default Alert;
