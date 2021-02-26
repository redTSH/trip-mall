import './xxsw.css';
import { getJSON } from 'api/ajax';
import { xxswURL } from 'api/URL';
import render from './xxswbd.art';

const xxswBd = document.querySelector('.xxsw .bd');
getJSON(xxswURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`新鲜甩尾模块通讯错误：${response.code}`)
    } else {
        // console.log(response.data);
        xxswBd.innerHTML = render({ items: response.data })
    }
}).catch(err => {
    alert(err)
})