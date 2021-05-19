const popupActivator = (state = {toggle: false, data: ""}, action) => {
    switch(action.type) {
        case "ENABLE":
            return state = {toggle: true, data: action.payload.data}
        case "DISABLE":
            return state = false
        default:
            return state
    }
}
export default popupActivator;
