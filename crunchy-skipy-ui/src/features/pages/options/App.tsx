import React from 'react';

export function App(): JSX.Element {
    return (
        <div className="App">
            <h1>CrunchySkipy</h1>

            <ul className="CrunchySkipyForm">
                <li className="CrunchySkipyValidation">
                    <div className="CrunchySkipyValidationField">
                        <span className="CrunchySkipyValidationFieldTitle">Title</span>
                        <span
                            className={"CrunchySkipyValidationFieldStatus"}>
                        </span>
                    </div>
                    <div className="CrunchySkipyVAlidationFieldValue">Hi</div>
                </li>
            </ul>
        </div>
    );
}
