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

export const studentDetails = async (args) => {

    const formData = new FormData();

    var documents = args.queryKey[1].documents;

    formData.append("student_email", args.queryKey[1].student_email);
    formData.append("fname", args.queryKey[1].fname);
    formData.append("lname", args.queryKey[1].lname);
    formData.append("address", args.queryKey[1].address);
    formData.append("date_of_birth", args.queryKey[1].date_of_birth);
    formData.append("phone_number", args.queryKey[1].phone_number);
    formData.append("year_of_study", args.queryKey[1].year_of_study);
    formData.append("allow_show_location", args.queryKey[1].allow_show_location);

   documents.forEach((file => {
       formData.append("documents", file);
   }))

    const response = await fetch("/api/students",{
        method: "POST",
        headers: {
            "Accepts":"application/json"
        },
        body: formData
    });
    const content = await response.json();
    return content;
}