import React, { useEffect, useState } from 'react';
import './Popup.css';
import { Message } from '../../contracts/Message.interface';

const Popup = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          /**
           * Sends a single message to the content script(s) in the specified tab,
           * with an optional callback to run when a response is sent back.
           *
           * The runtime.onMessage event is fired in each content script running
           * in the specified tab for the current extension.
           */
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: 'get_dom' } as Message,
              (response: Message) => {
              if (chrome.runtime.lastError) {
                setTimeout(() => console.log('Initial timeout!'), 1000);
              } else {
                setTitle(response.payload);
              }
            }
          );
        }
      );
  });

  return (
    <div className="App">
      <h1>CrunchySkipy</h1>

      <ul className="CrunchySkipyForm">
        <li className="CrunchySkipyValidation">
          <div className="CrunchySkipyValidationField">
            <span className="CrunchySkipyValidationFieldTitle">Title</span>
            <span
              className={`CrunchySkipyValidationFieldStatus ${
                title.length < 30 || title.length > 65 ? 'Error' : 'Ok'
              }`}
            >
              {title.length} Characters
            </span>
          </div>
          <div className="CrunchySkipyVAlidationFieldValue">{title || ''}</div>
        </li>
      </ul>
    </div>
  );
};

export default Popup;
