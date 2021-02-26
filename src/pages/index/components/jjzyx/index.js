import './jjzyx.css';
import { getJSON } from 'api/ajax';
import { jjzyxURL } from 'api/URL';
import render from './bd.art';

const jjzyxBd = document.querySelector('.jjzyx .bd');
// const url = 'https://www.imooc.com/api/mall-PC/index/self_guided_tour?icode=JC0398061C17A8687';

getJSON(jjzyxURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`JJZYX状态码不对${response.code}`)
    } else {
        // console.log(response.data);
        jjzyxBd.innerHTML = render(response.data);
    }
}).catch(err => {
    alert(err)
})

