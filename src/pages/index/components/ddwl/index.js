import './ddwl.css';
import { getJSON } from 'api/ajax';
import { ddwlURL } from 'api/URL';
import render from './ddwlbd.art';

const ddwlBd = document.querySelector('.ddwl .bd');
getJSON(ddwlURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`新鲜甩尾模块通讯错误：${response.code}`)
    } else {
        // console.log(response.data);
        ddwlBd.innerHTML = render(response.data)
    }
}).catch(err => {
    alert(err)
})