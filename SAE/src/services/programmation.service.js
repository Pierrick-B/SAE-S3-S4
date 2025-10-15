import LocalSource from "@/services/localsource.service.js";

async function getProgrammationFromLocalSource(){
    return LocalSource.getProgrammation()
}

async function getProgrammation(){
    let response = null;
    console.log("test")
    try{
        response = await getProgrammationFromLocalSource()
    }
    catch(err){
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'  }
    }
    return response
}

export default{
    getProgrammation
}
