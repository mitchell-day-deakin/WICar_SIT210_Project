async function httpRequest(reqType, url, params){
    if(reqType.toUpperCase() == "POST"){
        //post request
        await axios.post(url, ...params)
            .then((res)=>{
                return res;
            })
            .catch(err=>{
                console.log(err);
                return
            })
    }

    await axios.get(url, {params})
        .then(res=>{
            return res;
        })
        .catch(err=>{
            console.log(err)
            return err;
        })
}