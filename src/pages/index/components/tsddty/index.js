import './tsddty.css';
import { getJSON } from 'api/ajax';
import { tstyURL } from 'api/URL';
import render from './tsddtybd.art';

const tsddtyBd = document.querySelector('.ddts .bd');
getJSON(tstyURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`特色当地体验模块通讯错误：${response.code}`)
    } else {
        // console.log(response.data);
        tsddtyBd.innerHTML = render({ items: response.data })
    }
}).catch(err => {
    alert(err)
})