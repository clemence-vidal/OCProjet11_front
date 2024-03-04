export const login = (email, password) => {
    return {
        type: "LOGIN",
        payload: {
            email, 
            password,
        },
    };
};