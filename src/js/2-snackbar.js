import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const delay = document.querySelector('[name="delay"]');
const states = document.querySelectorAll('[name="state"]');
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayValue = Number(delay.value);
    const stateValue = [...states].find(la => la.checked)?.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateValue === 'fulfilled') {
                return resolve(delayValue);
            } else {
                return reject(delayValue);
            }
        }, delayValue)
    })

    promise
        .then(
            () => {
                iziToast.show({
                    title: 'OK',
                    color: 'green',
                    message: `✅ Fulfilled promise in ${delayValue}ms`
                });
            }
        )
        .catch(
            () => {
                iziToast.show({
                    title: 'Error',
                    color: 'red',
                    message: `❌ Rejected promise in ${delayValue}ms`
                });
            }
        );

    delay.value = '';

    states.forEach(la => la.checked = false);
});