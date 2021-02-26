import './gty.css';
import { getJSON } from 'api/ajax';
import { gtyURL } from 'api/URL';
import render from './gtybd.art';

const gtyBd = document.querySelector('.gty .bd');
getJSON(gtyURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`最世界模块通讯错误：${response.code}`)
    } else {
        // console.log(response.data);
        gtyBd.innerHTML = render(response.data)
    }
}).catch(err => {
    alert(err)
})