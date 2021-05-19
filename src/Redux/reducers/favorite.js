const favsReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_TO_FAVS":
            let id = state.find(element => element.id === action.payload.id)
            if(id === undefined){
                return state = [
                    ...state,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        img: action.payload.img,
                        size: action.payload.size,
                        price: action.payload.price
                    }
                ];
            } else {
                return state
            }
        case "REMOVE_FROM_FAVS":
            return state = state.filter((e) => {
                return e.id !== action.payload.id
            })
        default:
            return state
    }
}
export default favsReducer;
