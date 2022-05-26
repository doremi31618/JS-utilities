const fetchPost = async (formMethod, fetchURL, _body)=>{

    fetch(fetchURL, {
        method: formMethod,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(_body)
    })
}
