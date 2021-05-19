export const getData = async (data) => {

    let body = {
        "category": data.category,
        "data": "all"
    }
    try {
        const res = await fetch(`http://localhost:5003/get`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify(body)
        })
        return await res.json()
    } catch (e) {
        console.log(e)
        if(e === "TypeError: Failed to fetch"){
            return "Error"
        }
    }
}
