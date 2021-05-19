const popupActivator = (state = false, action) => {
    switch(action.type) {
        case "ENABLE":
            return state = true
        case "DISABLE":
            return state = false
        default:
            return state
    }
}
export default popupActivator;
