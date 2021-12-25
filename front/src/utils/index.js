import Swal from "sweetalert2";

export const displaySuccessMsg = (msg, displayTime) => {
  if (displayTime) {
    return Swal.fire({
      position: "center",
      icon: "success",
      showCloseButton: false,
      timer: displayTime,
      title: msg,
    });
  } else {
    return Swal.fire({
      position: "center",
      icon: "success",
      title: msg,
    });
  }
};

export const displayInfoMsg = (msg, displayTime) => {
  if (displayTime) {
    return Swal.fire({
      position: "center",
      icon: "info",
      showCloseButton: false,
      timer: displayTime,
      title: msg,
    });
  } else {
    return Swal.fire({
      position: "center",
      icon: "info",
      title: msg,
    });
  }
};

export const displayErrorMsg = (msg, displayTime) => {
  if (displayTime) {
    return Swal.fire({
      position: "center",
      icon: "error",
      showCloseButton: false,
      timer: displayTime,
      title: msg,
    });
  } else {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: msg,
    });
  }
};

export const isUserLoggedIn = () => localStorage.getItem("mern-af_loggedUser");

// Get token and set token from localStorage user
export const getTokenBeared = () => {
  const token = JSON.parse(localStorage.getItem("mern-af_loggedUser")).token;
  return `bearer ${token}`;
};

// Get config object with token in it
export const getConfigObj = () => {
  return {
    headers: { Authorization: getTokenBeared() },
  };
};

export function emptyCache() {
  if ("caches" in window) {
    caches.keys().then((names) => {
      // Delete all the cache files
      names.forEach((name) => {
        caches.delete(name);
      });
    });

    // Makes sure the page reloads. Changes are only visible after you refresh.
    window.location.reload(true);
  }
}

export const parseDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};
