import { hideModal, svg } from './utils.js';
import {
  QuickStartOnboardingDarkURL,
  QuickStartOnboardingURL,
  QuickStartTutorialURL,
  TutorialsURL,
} from './config.js';

const onboardingShownKey = 'AIPRM_onboardingShown';
const onboardingModalID = 'onboardingModal';

const showOnboarding = (lastPromptTemplateTypeKey, cacheBuster) => {
  const wasShown = getOnboardingShown(lastPromptTemplateTypeKey);

  if (wasShown) {
    return false;
  }

  let modal = document.getElementById(onboardingModalID);

  // if modal does not exist, create it, add event listener on submit and append it to body
  if (!modal) {
    modal = document.createElement('div');
    modal.id = onboardingModalID;
    document.body.appendChild(modal);
  }

  modal.innerHTML = /*html*/ `
        <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__text-center AIPRM__transition-opacity AIPRM__z-50">
            <div class="AIPRM__absolute AIPRM__bg-black/50 dark:AIPRM__bg-black/80 AIPRM__inset-0"></div>

            <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__overflow-y-auto">
                <div class="AIPRM__fixed AIPRM__inset-0 AIPRM__text-center AIPRM__transition-opacity AIPRM__z-50">
                    <div class="AIPRM__flex AIPRM__items-center AIPRM__justify-center AIPRM__min-h-full">
                        <div class="AIPRM__align-center AIPRM__bg-white dark:AIPRM__bg-gray-900 dark:AIPRM__text-gray-200 AIPRM__inline-block AIPRM__overflow-hidden sm:AIPRM__rounded-lg AIPRM__shadow-xl sm:AIPRM__align-middle AIPRM__text-left AIPRM__transform AIPRM__transition-all"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                            <div class="AIPRM__bg-white dark:AIPRM__bg-gray-900 AIPRM__px-4 AIPRM__pt-5 AIPRM__pb-4 sm:AIPRM__p-6 sm:AIPRM__pb-4">
                                <div class="AIPRM__flex AIPRM__gap-4 AIPRM__border-b AIPRM__border-gray-200 dark:AIPRM__border-gray-700 AIPRM__my-4">
                                    <h3 class="AIPRM__m-0 AIPRM__text-gray-900 dark:AIPRM__text-gray-100 AIPRM__text-xl AIPRM__whitespace-nowrap">AIPRM Quick start tutorial</h3>
                                    <div class="AIPRM__text-right AIPRM__w-full">
                                        <button id="AIPRM__onboardingCloseButton">${svg(
                                          'CrossLarge'
                                        )}</button>
                                    </div>
                                </div>

                                <a href="${QuickStartTutorialURL}" target="_blank" rel="noopener noreferrer">
                                    <img src="${QuickStartOnboardingURL}?v=${cacheBuster}" title="AIPRM Quick start tutorial" alt="AIPRM Quick start tutorial" class="AIPRM__max-h-60vh AIPRM__my-4 dark:AIPRM__hidden" />
                                    <img src="${QuickStartOnboardingDarkURL}?v=${cacheBuster}" title="AIPRM Quick start tutorial" alt="AIPRM Quick start tutorial" class="AIPRM__max-h-60vh AIPRM__my-4 AIPRM__hidden dark:AIPRM__block" />
                                </a>
                            </div>

                            <div class="AIPRM__bg-gray-200 dark:AIPRM__bg-gray-850 AIPRM__px-4 AIPRM__py-3 AIPRM__text-right">
                                <a href="${TutorialsURL}" target="_blank" rel="noopener noreferrer" title="View AIPRM tutorials for more information"
                                    class="AIPRM__bg-blue-600 hover:AIPRM__bg-blue-700 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">View tutorials
                                </a>
                                <button id="AIPRM__onboardingOkButton" type="button" title="Close this dialog and start using AIPRM"
                                    class="AIPRM__bg-green-600 hover:AIPRM__bg-green-700 AIPRM__mr-2 AIPRM__px-4 AIPRM__py-2 AIPRM__rounded AIPRM__text-white">Get started with AIPRM
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  const keydownListener = (e) => {
    if (e.key === 'Escape') {
      finish();
    }
  };

  const finish = () => {
    hideModal(onboardingModalID);

    try {
      localStorage.setItem(onboardingShownKey, true);
    } catch (error) {
      console.error(
        'Could not update onboarding status in local storage',
        error
      );
    }

    document.removeEventListener('keydown', keydownListener);
  };

  const onboardingOkButton = document.getElementById(
    'AIPRM__onboardingOkButton'
  );
  onboardingOkButton.onclick = () => {
    finish();
  };

  const onboardingCloseButton = document.getElementById(
    'AIPRM__onboardingCloseButton'
  );
  onboardingCloseButton.onclick = () => {
    finish();
  };

  modal.style = 'display: block;';

  // add event listener to close the modal on ESC
  document.addEventListener('keydown', keydownListener);

  return true;
};

const getOnboardingShown = (lastPromptTemplateTypeKey) => {
  let wasShown;
  try {
    const wasShownValue = localStorage.getItem(onboardingShownKey);

    if (wasShownValue) {
      wasShown = wasShownValue === 'true';
    } else {
      // Check if the lastPromptTemplateType is set in localStorage
      const lastPromptTemplateType = localStorage.getItem(
        lastPromptTemplateTypeKey
      );

      // Set onboarding shown to true for existing user
      if (lastPromptTemplateType && lastPromptTemplateType !== '') {
        wasShown = true;
      } else {
        wasShown = false;
      }

      localStorage.setItem(onboardingShownKey, wasShown);
    }
  } catch (error) {
    console.error('Could not get onboarding status from local storage', error);
  }

  return wasShown;
};

export { showOnboarding };
