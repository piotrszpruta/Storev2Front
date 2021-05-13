const loggedReducer = (state = {role: "user", isLogged: false,}, action) => {
    switch(action.type) {
        case "SING_IN":
            return state = {
                role: action.payload.role,
                isLogged: true,
            };
        case "SING_OUT":
            return state = {
                role: "user",
                isLogged: false,
            };
        default:
            return state
    }
}
export default loggedReducer;
