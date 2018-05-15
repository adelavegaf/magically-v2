import StorageApi from './utils/StorageApi';

const sanitizeInput = (input) => {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

const wrapFixBodyInCommonComponent = (domSelector, body) => {
  return `{
    const domElement = document.querySelector('${domSelector}');
    if (domElement) {
      ${body}
    }
  }`;
};

const applyContrastErrorsFix = (contrastErrors) => {
  return Object
    .entries(contrastErrors)
    .filter(([, error]) => error.isFixed)
    .map(([, error]) => {
      const body = `
      domElement.style.background = "${sanitizeInput(error.backgroundColor)}";
      domElement.style.color = "${sanitizeInput(error.foregroundColor)}";
      `;
      return wrapFixBodyInCommonComponent(error.domSelector, body);
    });
};

const applyImageErrorsFix = (imageErrors) => {
  return Object
    .entries(imageErrors)
    .filter(([, error]) => error.isFixed)
    .map(([, error]) => {
      const body = `
      domElement.alt = "${sanitizeInput(error.description)}";
      `;
      return wrapFixBodyInCommonComponent(error.domSelector, body);
    });
};

const applyLangErrorsFix = (langErrors) => {
  return Object
    .entries(langErrors)
    .filter(([, error]) => error.isFixed)
    .map(([, error]) => {
      const body = `
      domElement.lang = "${sanitizeInput(error.lang)}";
      `;
      return wrapFixBodyInCommonComponent(error.domSelector, body);
    });
};

const getFixFromProject = (project) => {
  const {contrastErrors, imageErrors, langErrors} = project.errors;
  const contrastFix = applyContrastErrorsFix(contrastErrors);
  const imageFix = applyImageErrorsFix(imageErrors);
  const langFix = applyLangErrorsFix(langErrors);
  const generalFix = [...contrastFix, ...imageFix, ...langFix];
  return generalFix.join('');
};

export default class Fix {
  static generateFrom(project) {
    return StorageApi.getIsAutomaticFixEnabled().then(({isAutomaticFixEnabled}) => {
      if (isAutomaticFixEnabled) {
        const fix = getFixFromProject(project);
        chrome.tabs.executeScript({
          code: fix
        });
      }
    });
  }
}
