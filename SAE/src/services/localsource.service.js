import {programmation } from '@/datasource/data_programmation.js'

function getProgrammation(){
    return{error:0, data:programmation}
}

export default{
    getProgrammation
}