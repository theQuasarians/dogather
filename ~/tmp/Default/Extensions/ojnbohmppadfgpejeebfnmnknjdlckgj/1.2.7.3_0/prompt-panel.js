import { sanitizeInput } from './utils.js';

/** @enum {string} */
const PromptGroup = {
  FAVORITES: 'Favorites',
  CUSTOM_LISTS: 'Custom Lists',
  OWN: 'Own',
  PUBLIC: 'Public',
};

// Prompt panel with quick search and selection of prompts in the chat input
export class PromptPanel {
  /**
   * @param {Element} inputField
   * @param {import("./list").Lists} lists
   * @param {import("./client").Quota} userQuota
   * @param {() => import('./inject').Prompt[]} getAllPromptsCallback
   * @param {(template: import('./inject').Prompt) => Promise<void>} selectPromptCallback
   */
  constructor(
    inputField,
    lists,
    userQuota,
    getAllPromptsCallback,
    selectPromptCallback
  ) {
    if (!inputField?.parentNode?.parentNode) {
      console.error(
        'AIPRM Prompt Panel - input field not found/structure changed'
      );
      return;
    }

    this.inputField = inputField;

    this.promptPanel = document.getElementById('AIPRM__PromptPanel');

    // if prompt panel already exists, do not create another one
    if (this.promptPanel) {
      return;
    }

    // create the prompt panel container
    this.promptPanel = document.createElement('div');
    this.promptPanel.id = 'AIPRM__PromptPanel';
    this.promptPanel.classList =
      'AIPRM__absolute AIPRM__bottom-16 AIPRM__z-20 AIPRM__w-full AIPRM__space-y-2 AIPRM__hidden';

    this.promptPanel.innerHTML = /*html*/ `
          <div class="AIPRM__rounded-2xl AIPRM__border AIPRM__border-black/[0.1] dark:AIPRM__border-white/[0.1] AIPRM__p-2 AIPRM__shadow-lg AIPRM__bg-white dark:AIPRM__bg-gray-800">
            <input id="AIPRM__PromptPanel__search-input" placeholder="Search AIPRM prompts" class="AIPRM__mb-1 AIPRM__w-full AIPRM__border-0 AIPRM__white AIPRM__p-2 AIPRM__text-sm focus:AIPRM__outline-none dark:AIPRM__bg-gray-800">
             <div class="AIPRM__prompt-list AIPRM__max-h-40 AIPRM__overflow-y-auto"></div>
          </div>`;

    // inject it before the parent node of the input field parent
    inputField.parentNode.parentNode.insertBefore(
      this.promptPanel,
      inputField.parentNode
    );

    this.searchInput = this.promptPanel.querySelector(
      '#AIPRM__PromptPanel__search-input'
    );

    this.promptList = this.promptPanel.querySelector('.AIPRM__prompt-list');

    this.getAllPrompts = getAllPromptsCallback;
    this.selectPromptCallback = selectPromptCallback;

    /**
     * @typedef {import("./inject").Prompt & { Group: PromptGroup }} PromptWithGroup
     */

    /** @type {PromptWithGroup[]} */
    this.prompts = [];
    this.lists = lists;
    this.userQuota = userQuota;

    this.selectedIndex = -1;
    this.debounceTimer = null;

    this.inputField.addEventListener('input', this.handleInput.bind(this));

    this.searchInput.addEventListener(
      'input',
      this.handleSearchInput.bind(this)
    );
    this.searchInput.addEventListener(
      'keydown',
      this.handleSearchInputKeyDown.bind(this)
    );

    this.handleDocumentClickBound = this.handleDocumentClick.bind(this);
  }

  // show/hide prompt panel based on input
  handleInput() {
    const query = this.inputField.value;

    if (query.startsWith('/') && query.length === 1) {
      this.showPromptPanel();
      this.focusSearchInput();

      // update textarea value
      this.inputField.value = query;
    }
  }

  // search prompts based on input with debounce
  handleSearchInput() {
    const query = this.searchInput.value;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searchPrompts(query);
    }, 300);
  }

  // handle keyboard navigation in prompt panel and apply selected prompt or hide panel
  handleSearchInputKeyDown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectPreviousPrompt();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectNextPrompt();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.applySelectedPrompt();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.hidePromptPanel();
    } else if (event.key === 'Backspace' && this.searchInput.value === '') {
      event.preventDefault();
      this.hidePromptPanel();
    }
  }

  // search prompts based on query and filter based on hidden, favorites, custom lists
  async searchPrompts(query) {
    // filter prompts based on query
    this.prompts = this.getAllPrompts().filter(
      (prompt) =>
        !query || prompt.Title.toLowerCase().includes(query.toLowerCase())
    );

    // get hidden, favorites, custom lists and the prompts in them
    const hidden = (await this.lists.getHidden()?.getPromptIDS()) || [];
    const favorites = (await this.lists.getFavorites()?.getPromptIDS()) || [];
    let customLists = this.lists.getCustom(this.userQuota);

    customLists =
      (
        await Promise.all(
          customLists.map(async (list) => await list.getPromptIDS())
        )
      )?.flat() || [];

    // remove hidden prompts
    if (hidden.length > 0) {
      this.prompts = this.prompts.filter(
        (prompt) => !hidden.includes(prompt.ID)
      );
    }

    // define "group" for each prompt - Favorites, Custom Lists, Own, Public
    if (favorites.length > 0 || customLists.length > 0) {
      this.prompts = this.prompts.map((prompt) => {
        if (favorites.includes(prompt.ID)) {
          prompt.Group = PromptGroup.FAVORITES;
        } else if (customLists.includes(prompt.ID)) {
          prompt.Group = PromptGroup.CUSTOM_LISTS;
        } else {
          prompt.Group = prompt.OwnPrompt
            ? PromptGroup.OWN
            : PromptGroup.PUBLIC;
        }

        return prompt;
      });
    } else {
      // only show Own and Public prompts if there are no favorites or custom lists
      this.prompts = this.prompts.map((prompt) => {
        prompt.Group = prompt.OwnPrompt ? PromptGroup.OWN : PromptGroup.PUBLIC;

        return prompt;
      });
    }

    // sort by Group - Favorites, Custom Lists, Own, Public
    this.prompts = this.prompts.sort((a, b) => {
      if (a.Group === b.Group) {
        return 0;
      }
      if (a.Group === PromptGroup.FAVORITES) {
        return -1;
      }
      if (b.Group === PromptGroup.FAVORITES) {
        return 1;
      }
      if (a.Group === PromptGroup.CUSTOM_LISTS) {
        return -1;
      }
      if (b.Group === PromptGroup.CUSTOM_LISTS) {
        return 1;
      }
      if (a.Group === PromptGroup.OWN) {
        return -1;
      }
      if (b.Group === PromptGroup.OWN) {
        return 1;
      }
      return 0;
    });

    // limit the number of prompts to show
    this.prompts = this.prompts.slice(0, 10);

    this.renderPrompts();

    this.selectPrompt(0);
  }

  // render prompts in the prompt panel based on the filtered prompts and groups (Favorites, Custom Lists, Own, Public)
  renderPrompts() {
    this.promptList.innerHTML = '';

    if (this.prompts.length === 0) {
      this.promptList.innerHTML =
        '<div class="AIPRM__px-4 AIPRM__py-2 AIPRM__text-gray-600">No prompts found.</div>';
      return;
    }

    let group = '';
    let index = 0;

    this.prompts.forEach((prompt) => {
      if (prompt.Group !== group) {
        group = prompt.Group;
        const groupElement = document.createElement('div');
        groupElement.className =
          'AIPRM__px-2 AIPRM__py-1 AIPRM__text-xs AIPRM__font-semibold AIPRM__text-gray-500';
        groupElement.textContent = group;
        this.promptList.appendChild(groupElement);
      }

      const promptElement = document.createElement('div');
      promptElement.tabIndex = index;

      promptElement.className =
        'AIPRM__group AIPRM__flex AIPRM__h-10 AIPRM__items-center AIPRM__gap-2 AIPRM__rounded-lg AIPRM__px-2 AIPRM__font-medium hover:AIPRM__bg-gray-100 AIPRM__text-sm AIPRM__text-gray-950 dark:AIPRM__text-gray-100 dark:hover:AIPRM__bg-gray-600';

      promptElement.innerHTML = `
            <div class="AIPRM__flex AIPRM__h-fit AIPRM__grow AIPRM__flex-row AIPRM__justify-between AIPRM__space-x-2 AIPRM__overflow-hidden AIPRM__text-ellipsis AIPRM__whitespace-nowrap">
              <div class="AIPRM__flex AIPRM__flex-row AIPRM__space-x-2 AIPRM__truncate">
                <span class="AIPRM__truncate dark:AIPRM__text-gray-100 AIPRM__shrink-0 AIPRM__max-w-full">${sanitizeInput(
                  prompt.Title
                )}</span>
                ${
                  prompt.AuthorName
                    ? `<span class="AIPRM__flex-grow AIPRM__truncate AIPRM__text-sm AIPRM__font-light AIPRM__text-gray-400 sm:AIPRM__max-w-xs lg:AIPRM__max-w-md AIPRM__hidden sm:AIPRM__block">${
                        prompt.AuthorName
                          ? `by ${sanitizeInput(prompt.AuthorName)}`
                          : ''
                      }</span>`
                    : ''
                }                
              </div>
            </div>
          `;

      const promptIndex = index;

      // select prompt on click
      promptElement.addEventListener('click', () => {
        this.selectPrompt(promptIndex);
        this.applySelectedPrompt();
      });

      this.promptList.appendChild(promptElement);

      index++;
    });
  }

  // hide prompt panel when clicked outside
  handleDocumentClick(event) {
    if (!this.promptPanel.contains(event.target)) {
      this.hidePromptPanel();
    }
  }

  // show prompt panel and search prompts based on input
  async showPromptPanel() {
    this.promptPanel.classList.remove('AIPRM__hidden');
    await this.searchPrompts(this.searchInput.value);

    document.addEventListener('click', this.handleDocumentClickBound);
  }

  // hide prompt panel and reset selected index
  hidePromptPanel() {
    this.promptPanel.classList.add('AIPRM__hidden');
    this.selectedIndex = -1;
    this.searchInput.value = '';
    this.inputField.focus();

    document.removeEventListener('click', this.handleDocumentClickBound);
  }

  // focus on search input and set cursor at the end
  focusSearchInput() {
    this.searchInput.focus();
    this.searchInput.selectionStart = this.searchInput.selectionEnd =
      this.searchInput.value.length;
  }

  // select previous prompt in the prompt panel
  selectPreviousPrompt() {
    if (this.selectedIndex > 0) {
      this.selectPrompt(this.selectedIndex - 1);
    }
  }

  // select next prompt in the prompt panel
  selectNextPrompt() {
    if (this.selectedIndex < this.prompts.length - 1) {
      this.selectPrompt(this.selectedIndex + 1);
    }
  }

  // select prompt in the prompt panel based on index and scroll to it
  selectPrompt(index) {
    const promptItems = this.promptPanel.querySelectorAll('.AIPRM__group');

    if (this.selectedIndex !== -1) {
      promptItems?.[this.selectedIndex]?.classList?.remove(
        'AIPRM__bg-gray-100',
        'dark:AIPRM__bg-gray-600'
      );
    }

    this.selectedIndex = index;

    promptItems?.[this.selectedIndex]?.classList?.add(
      'AIPRM__bg-gray-100',
      'dark:AIPRM__bg-gray-600'
    );

    this.scrollToSelectedPrompt();
  }

  // scroll to selected prompt in the prompt panel
  scrollToSelectedPrompt() {
    const promptItems = this.promptList.querySelectorAll('.AIPRM__group');
    const selectedPrompt = promptItems?.[this.selectedIndex];

    if (this.selectedIndex === 0) {
      this.promptList.scrollTop = 0;
    } else {
      selectedPrompt?.scrollIntoView({ block: 'nearest' });
    }
  }

  // apply selected prompt in the chat input and hide prompt panel
  applySelectedPrompt() {
    if (this.selectedIndex !== -1) {
      const selectedPrompt = this.prompts[this.selectedIndex];

      this.selectPromptCallback(selectedPrompt);

      this.inputField.value = '';

      this.hidePromptPanel();
    }
  }
}
