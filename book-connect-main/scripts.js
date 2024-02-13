// @ts-check

/**
 * Imported array of book objects.
 * @type {Array<Object>}
 */
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

/**
 * Current page number for pagination.
 * @type {number}
 */
let page = 1;

/**
 * Array of book objects that match the search criteria.
 * @type {Array<Object>}
 */
let matches = books;

/**
 * Display books per page based on the current matches.
 * @returns {void}
 */
const displayBooksPerPage = () => {
  const starting = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    // @ts-ignore
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />

            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    starting.appendChild(element);
  }

  // @ts-ignore
  document.querySelector("[data-list-items]").appendChild(starting);
};

displayBooksPerPage();

/**
 * Generates and appends genre options to a specified element.
 * @param {Object} genresObj - Object containing genre IDs as keys and genre names as values.
 * @param {string} selector - CSS selector for the element to which genre options will be appended.
 * @returns {void}
 */
const appendGenreOptions = (genresObj, selector) => {
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  genreHtml.appendChild(firstGenreElement);

  for (const [id, name] of Object.entries(genresObj)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }

  // @ts-ignore
  document.querySelector(selector).appendChild(genreHtml);
};

appendGenreOptions(genres, "[data-search-genres]");

/**
 * Generates and appends author options to a specified element.
 * @param {Object} authorsObj - Object containing author IDs as keys and author names as values.
 * @param {string} selector - CSS selector for the element to which author options will be appended.
 * @returns {void}
 */
const appendAuthorOptions = (authorsObj, selector) => {
  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authorsObj)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }

  // @ts-ignore
  document.querySelector(selector).appendChild(authorsHtml);
};

appendAuthorOptions(authors, "[data-search-authors]");

/**
 * Sets the theme based on user's preference for dark mode.
 * @returns {void}
 */
const setThemeBasedOnPreference = () => {
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDarkMode) {
    // @ts-ignore
    document.querySelector("[data-settings-theme]").value = "night";
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    // @ts-ignore
    document.querySelector("[data-settings-theme]").value = "day";
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
};

setThemeBasedOnPreference();

/**
 * Updates the "Show more" button text and disabled state based on matches and page.
 * @returns {void}
 */
function updateShowMoreButton() {
  const listButtonElement = document.querySelector("[data-list-button]");
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  // @ts-ignore
  listButtonElement.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
  // @ts-ignore
  listButtonElement.disabled = remainingBooks > 0;
  // @ts-ignore
  listButtonElement.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          remainingBooks > 0 ? remainingBooks : 0
        })</span>
    `;
}

// Add event listener for "Show more" button clicks
// @ts-ignore
document.querySelector("[data-list-button]").addEventListener("click", () => {
  // Handle "Show more" button click...
});

// Add event listener for search overlay cancel button clicks
// @ts-ignore
document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  // Close the search overlay
  const searchOverlay = document.querySelector("[data-search-overlay]");
  if (searchOverlay) {
    // @ts-ignore
    searchOverlay.open = false;
  }
});

// Add event listener for settings overlay cancel button clicks
// @ts-ignore
document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    // Close the settings overlay
    const settingsOverlay = document.querySelector("[data-settings-overlay]");
    if (settingsOverlay) {
      // @ts-ignore
      settingsOverlay.open = false;
    }
  });

// Add event listener for header search icon clicks
// @ts-ignore
document.querySelector("[data-header-search]").addEventListener("click", () => {
  // Open the search overlay and focus on the search title input
  const searchOverlay = document.querySelector("[data-search-overlay]");
  if (searchOverlay) {
    // @ts-ignore
    searchOverlay.open = true;
    const searchTitleInput = document.querySelector("[data-search-title]");
    if (searchTitleInput) {
      // @ts-ignore
      searchTitleInput.focus();
    }
  }
});

// Add event listener for header settings icon clicks
// @ts-ignore
document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    // Open the settings overlay
    const settingsOverlay = document.querySelector("[data-settings-overlay]");
    if (settingsOverlay) {
      // @ts-ignore
      settingsOverlay.open = true;
    }
  });

// Add event listener for list close button clicks
// @ts-ignore
document.querySelector("[data-list-close]").addEventListener("click", () => {
  // Close the active list
  const listActiveElement = document.querySelector("[data-list-active]");
  if (listActiveElement) {
    // @ts-ignore
    listActiveElement.open = false;
  }
});

// Update the "Show more" button initially
updateShowMoreButton();

/**
 * Handles form submission for the settings form.
 * Updates the theme based on the selected option and closes the settings overlay.
 * @param {Event} event - The form submission event.
 * @returns {void}
 */
function handleSettingsFormSubmit(event) {
  event.preventDefault();

  // Get form data
  // @ts-ignore
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  // Update theme based on the selected option
  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }

  // Close the settings overlay
  const settingsOverlay = document.querySelector("[data-settings-overlay]");
  if (settingsOverlay) {
    // @ts-ignore
    settingsOverlay.open = false;
  }
}

// Add event listener for settings form submission
// @ts-ignore
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", handleSettingsFormSubmit);

/**
 * Handles form submission for the search form.
 * Filters books based on search criteria, updates the UI, and closes the search overlay.
 * @param {Event} event - The form submission event.
 * @returns {void}
 */
const handleSearchFormSubmit = (event) => {
  event.preventDefault();

  // Get form data
  // @ts-ignore
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  // Filter books based on search criteria
  const result = books.filter((book) => {
    let genreMatch = filters.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    return (
      // @ts-ignore
      (filters.title.trim() === "" ||
        // @ts-ignore
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    );
  });

  // Update page and matches
  page = 1;
  matches = result;

  // Update UI
  const listMessageElement = document.querySelector("[data-list-message]");
  if (result.length < 1) {
    // @ts-ignore
    listMessageElement.classList.add("list__message_show");
  } else {
    // @ts-ignore
    listMessageElement.classList.remove("list__message_show");
  }

  const listItemsElement = document.querySelector("[data-list-items]");
  // @ts-ignore
  listItemsElement.innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    // @ts-ignore
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    newItems.appendChild(element);
  }

  // @ts-ignore
  listItemsElement.appendChild(newItems);

  const listButtonElement = document.querySelector("[data-list-button]");
  // @ts-ignore
  listButtonElement.disabled = matches.length - page * BOOKS_PER_PAGE < 1;
  // @ts-ignore
  listButtonElement.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;

  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close the search overlay
  const searchOverlay = document.querySelector("[data-search-overlay]");
  if (searchOverlay) {
    // @ts-ignore
    searchOverlay.open = false;
  }
};

// Add event listener for search form submission
// @ts-ignore
document
  .querySelector("[data-search-form]")
  .addEventListener("submit", handleSearchFormSubmit);

/**
 * Handles click events on the "Show more" button.
 * @returns {void}
 */
function handleShowMoreButtonClick() {
  const fragment = document.createDocumentFragment();
  const startIndex = page * BOOKS_PER_PAGE;
  const endIndex = (page + 1) * BOOKS_PER_PAGE;
  const remainingBooks = matches.length - endIndex;

  for (const { author, id, image, title } of matches.slice(
    startIndex,
    endIndex
  )) {
    const element = document.createElement("button");
    // @ts-ignore
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    fragment.appendChild(element);
  }

  // @ts-ignore
  document.querySelector("[data-list-items]").appendChild(fragment);
  page += 1;

  // @ts-ignore
  document.querySelector("[data-list-button]").disabled = remainingBooks <= 0;
}

// @ts-ignore
document
  .querySelector("[data-list-button]")
  .addEventListener("click", handleShowMoreButtonClick);

handleShowMoreButtonClick();

/**
 * Handles click events on list items.
 * @param {Event} event - The click event.
 * @returns {void}
 */
const handleListItemClick = (event) => {
  // @ts-ignore
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      active = books.find((book) => book.id === node.dataset.preview);
    }
  }

  if (active) {
    const listActiveElement = document.querySelector("[data-list-active]");
    // @ts-ignore
    listActiveElement.open = true;
    // @ts-ignore
    document.querySelector("[data-list-blur]").src = active.image;
    // @ts-ignore
    document.querySelector("[data-list-image]").src = active.image;
    // @ts-ignore
    document.querySelector("[data-list-title]").innerText = active.title;
    // @ts-ignore
    document.querySelector("[data-list-subtitle]").innerText = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;
    // @ts-ignore
    document.querySelector("[data-list-description]").innerText =
      active.description;
  }
};

// @ts-ignore
document
  .querySelector("[data-list-items]")
  .addEventListener("click", handleListItemClick);
