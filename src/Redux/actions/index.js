export const addBasket = (id, name, img, size, price) => {
    return {
        type: "ADD_TO_BASKET",
        payload: {id: id, name: name, img: img, size: size, price: (price.slice(6)).slice(0, -3) }
    }
}

export const removeBasket = (id) => {
    return {
        type: "REMOVE_FROM_BASKET",
        payload: {id: id}
    }
}

export const clearBasket = () => {
    return {
        type: "REMOVE_WHOLE_BASKET"
    }
}

export const logIn = (isLogged ,role) => {
    return {
        type: "SING_IN",
        payload: {isLogged: isLogged, role: role}
    }
}

export const logOut = () => {
    return {
        type: "SING_OUT"
    }
}
