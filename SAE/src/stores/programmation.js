import { ref } from 'vue'
import { defineStore } from 'pinia'

import ProgrammationService from '@/services/programmation.service'

export const useProgrammationStore = defineStore('programmation',()=>{
    const programmation = ref([])

    async function getProgrammation(){
        console.log("recuperation de la progra")
        let response = await ProgrammationService.getProgrammation()
        if (response.error === 0) {
            programmation.value = response.data
        } else {
            console.log(response.data)
        }
    }
    return {programmation, getProgrammation}
})