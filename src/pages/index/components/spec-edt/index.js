import './spec-edt.css';
import { getJSON } from 'api/ajax';
import { adURL } from 'api/URL';
import render from './spec-edt.art';

const spec_edt = document.getElementById('spec_edt');

getJSON(adURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`ad模块通讯错误：${response.code}`)
    } else {
        // console.log(response.data);
        spec_edt.innerHTML = render({ items: response.data })
    }
}).catch(err => {
    alert(err)
})