const baketReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_TO_BASKET":
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
        case "REMOVE_FROM_BASKET":
            return state = state.filter((e) => {
                return e.id !== action.payload.id
            })
        case "REMOVE_WHOLE_BASKET":
            return state = []
        default:
            return state
    }
}
export default baketReducer;
