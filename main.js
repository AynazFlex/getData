'use strict'

const url = 'http://109.236.74.74:9900/getdata';

let arr;


clientToServer(url).then(() => {
    const form = document.forms[0];
    arr = root.querySelectorAll('td');
    const formRed = document.querySelector('.forms');
    edit.onclick = () => {
        formRed.classList.remove('close');
        edit.classList.add('close');
        form.name.value = '';
        form.email.value = '';
        form.owner.value = '';
    };
    save.onclick = () => root.querySelectorAll('th').forEach((e, i) => {
        switch (e.textContent) {
            case 'Name': {
                if(form.name.value) {
                    arr[i].textContent = form.name.value
                }
                break;
            }
            case 'Email': {
                if(form.email.value) {
                    arr[i].textContent = form.email.value
                }
                break;
            }
            case 'Owner': {
                if(form.owner.value) {
                    arr[i].textContent = form.owner.value
                }
                break;
            }
        }
        formRed.classList.add('close');
        edit.classList.remove('close');
    });
});

async function clientToServer(url) {
    console.log('yes');
    let response = await fetch(url);
    let result = await response.json();
    createTable(result);
}

let fun1 = obj => Object.keys(obj).map(key => typeof obj[key] === 'object' ? fun1(obj[key]).join('') : `<th>${key}</th>`);
let fun2 = obj => Object.values(obj).map(e => typeof e === 'object' ? fun2(e).join('') : `<td>${e}</td>`);

async function createTable(data) {
    let div = document.createElement('div')
    root.append(div);
    div.innerHTML = `<table><tbody></tbody></table>`;
    let table = div.querySelector('tbody');
    table.innerHTML = `<tr>${fun1(data).join('')}</tr>`;
    table.innerHTML += `<tr>${fun2(data).join('')}</tr>`;
}