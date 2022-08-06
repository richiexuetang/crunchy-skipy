/**
 * Main function.
 */
((): void => {
  const { currentScript } = document;
  console.log('document is ', document, 'currentScript is', currentScript);

  /**
   * Retrieves the property and sets it as the data attribute.
   */
  const setAttribute = (): void => {
    if (!currentScript) {
      return;
    }

    const { property } = currentScript.dataset;
    console.log('currentScript.dataset is', currentScript.dataset);
    if (!property) {
      return;
    }

    // Allow nested property access.
    const properties = property.split('.') as (keyof Window)[];

    let currentValue = window;

    for (
      let i = 0;
      currentValue[properties[i]] && i < properties.length;
      i += 1
    ) {
      currentValue = currentValue[properties[i]];
    }

    currentScript.dataset.value = JSON.stringify(currentValue);
  };

  if (document.readyState === 'complete') {
    setAttribute();

    return;
  }

  const listener = (): void => {
    setAttribute();

    window.removeEventListener('load', listener);
  };

  window.addEventListener('load', listener);
})();

console.log('Window is working!');
