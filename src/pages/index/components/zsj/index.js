import './zsj.css';
import { getJSON } from 'api/ajax';
import { zsjURL } from 'api/URL';
import render from './zsjbd.art';

const zsjBd = document.querySelector('.zsj .bd');
getJSON(zsjURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`最世界模块通讯错误：${response.code}`)
    } else {
        // console.log(response.data);
        zsjBd.innerHTML = render(response.data)
    }
}).catch(err => {
    alert(err)
})