// Array of keys
let keys = [];

// Keydown code
document.addEventListener(`keydown`, (e) => {
    keys[e.key] = true;
    // console.log(e.key)
})

// Keyup code
document.addEventListener(`keyup`, (e) => {
    keys[e.key] = false;
})

