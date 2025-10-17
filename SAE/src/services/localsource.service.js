import {programmation } from '@/datasource/data_programmation.js'
import {billets as defaultBillets} from '@/datasource/data_billetterie.js'
function getProgrammation(){
    return{error:0, data:programmation}
}
function getBilletterie() {
    let billets = JSON.parse(localStorage.getItem('billets'));
    if (!billets) {
        billets = defaultBillets;
        localStorage.setItem('billets', JSON.stringify(billets));
    }
    return {error: 0, data: billets};
}
export default{
    getProgrammation,
    getBilletterie
}