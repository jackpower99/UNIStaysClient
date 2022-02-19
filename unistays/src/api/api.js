export const register = async (args) => {
    console.log(args.queryKey[1])
    const params = {
        email: args.queryKey[1].email,
        password: args.queryKey[1].password,
        role: args.queryKey[1].role 
    };
    const response = await fetch("/api/users/?action=register",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accepts":"application/json"
        },
        body: JSON.stringify(params)
    });
    const content = await response.json();
    console.log(content);
}

export const getRefreshToken = async () => {
    const response = await fetch("/api/users/refresh",{
        method: "GET",
    });
    const content = await response.json();
    console.log(content)
}

export const login = async (args) => {
    const params = {
        email: args.queryKey[1].email,
        password: args.queryKey[1].password,
    };
    const response = await fetch("/api/users",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accepts":"application/json"
        },
        body: JSON.stringify(params)
    });
    const content = await response.json();
    return content
}

// export const logout = async (args) => {
//     console.log(args.queryKey[1])

//     const response = await fetch("/api/users/logout",{
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             "Accepts":"application/json"
//         },
//         body: JSON.stringify(params)
//     });
//     const content = await response.json();
//     return content
// }