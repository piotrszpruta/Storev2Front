export default async function LogOut(){

    return fetch(`http://localhost:5003/logout`, {
        method: "GET",
        credentials: "include"
    })
        .then(res => res.json())
        .then(data => {return data})

}
