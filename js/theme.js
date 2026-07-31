const root = document.documentElement;
const picker = document.querySelector(".theme-picker");
const select = document.querySelector("#theme-select");

/*this function gets the theme the page already has and stores it in local storage */
function getSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
  } catch {
    // The page should still work if localStorage is unavailable.
  }
}

/**this function actually applies the theme the user chose to the html. changes the theme value, connecting to the css page. */
function applyTheme(theme) {
  if (theme === "light" || theme === "dark") {
    root.dataset.theme = theme;
  } else {
    root.removeAttribute("data-theme");
  }
}

/** this function checks to see if the form is actually there before doing anything. we are essentially checking 
 * if javascript is enabled before making any changes. if javascript is enabled, then we are applying the saved theme. if 
 * there was no saved theme, we use the base 'system' theme. 
 * Additionally. if there javascript is enabled, then the form will actually appear due to picker.hidden = false. 
 */
if (picker && select) {
  const savedTheme = getSavedTheme() || "system";

  applyTheme(savedTheme);
  select.value = savedTheme;
  picker.hidden = false;

  select.addEventListener("change", () => {
    const chosenTheme = select.value;

    applyTheme(chosenTheme);
    saveTheme(chosenTheme);
  });
}