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

    formData.append("email", args.queryKey[1].email);
    formData.append("fname", args.queryKey[1].fname);
    formData.append("lname", args.queryKey[1].lname);
    formData.append("address", args.queryKey[1].address);
    formData.append("date_of_birth", args.queryKey[1].date_of_birth);
    formData.append("phone_number", args.queryKey[1].phone_number);
    formData.append("college", args.queryKey[1].college);
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

export const getStudentDetails = async (args) => { 
    const email = args.queryKey[1].email

    const response = await fetch(`/api/students/${email}`,{
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        "Accepts":"application/json"
        },
    });
    const content = await response.json();
    console.log(content)
 }

 export const getLandlordDetails = async (args) => { 
    const email = args.queryKey[1].email

    const response = await fetch(`/api/landlords/${email}`,{
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        "Accepts":"application/json"
        },
    });
    const content = await response.json();
    return content;
 }

//  function transformInToFormObject(data) {
//     let formData = new FormData();
//     for (let key in data) {
//       if (Array.isArray(data[key])) {
//         data[key].forEach((obj, index) => {
//           let keyList = Object.keys(obj);
//           keyList.forEach((keyItem) => {
//             let keyName = [key, "[", index, "]", ".", keyItem].join("");
//             formData.append(keyName, obj[keyItem]);
//           });
//         });
//       } else if (typeof data[key] === "object") { 
//         for (let innerKey in data[key]) {
//           formData.append(`${key}.${innerKey}`, data[key][innerKey]);
//         }
//       } else {
//         formData.append(key, data[key]);
//       }
//     }
//     console.log(formData);
//   }

export const landlordDetails = async (args) => {

    const formData = new FormData();

    var documents = args.queryKey[1].documents;

    formData.append("email", args.queryKey[1].email);
    formData.append("fname", args.queryKey[1].fname);
    formData.append("lname", args.queryKey[1].lname);
    formData.append("address", args.queryKey[1].address);
    formData.append("date_of_birth", args.queryKey[1].date_of_birth);
    formData.append("phone_number", args.queryKey[1].phone_number);

    documents.forEach((file => {
        formData.append("documents", file);
    }))
 
     const response = await fetch("/api/landlords",{
         method: "POST",
         headers: {
             "Accepts":"application/json"
         },
         body: formData
     });
     const content = await response.json();
     return content;
}

export const postAccomodation = async (args) => {
    console.log(args.queryKey[1])

    const propertyFormData = new FormData();

    var property_images = args.queryKey[1].property_images;

    var rooms = args.queryKey[1].rooms;

    propertyFormData.append("landlord_id", args.queryKey[1].landlordId);
    propertyFormData.append("property_type", args.queryKey[1].property_type);
    propertyFormData.append("bedroom_count", args.queryKey[1].bedroom_count);
    propertyFormData.append("bathroom_count", args.queryKey[1].bathroom_count);
    propertyFormData.append("county", args.queryKey[1].county);
    propertyFormData.append("address", args.queryKey[1].address);
    propertyFormData.append("zip", args.queryKey[1].zip);
    propertyFormData.append("description", args.queryKey[1].description);

    if(args.queryKey[1].posting_type === "Property"){
        propertyFormData.append("available_start", args.queryKey[1].available_start);
        propertyFormData.append("available_end", args.queryKey[1].available_end);
        propertyFormData.append("price_per_month", args.queryKey[1].price_per_month);
        propertyFormData.append("size_sq_meters", args.queryKey[1].size_sq_meters);
    }
    propertyFormData.append("posting_type", args.queryKey[1].posting_type);
    propertyFormData.append("UNIFlex_available", args.queryKey[1].UNIFlex_available);
    propertyFormData.append("UNIBNB_available", args.queryKey[1].UNIBNB_available);
    propertyFormData.append("colleges", args.queryKey[1].colleges);
    propertyFormData.append("amenities", args.queryKey[1].amenities);

    property_images.forEach((file => {
        propertyFormData.append("property_images", file);
    }))

    rooms.forEach((room => {
        propertyFormData.append("rooms", JSON.stringify(room));
    }))

    for (var value of propertyFormData.keys()) {
        console.log(value);
     }

    for(var i = 0; i < rooms.length; i++){
        for(var o = 0; o < rooms[i].room_images.length; o++){
            var fieldname = 'room_images['+i+']['+o+']';
            propertyFormData.append(fieldname, rooms[i].room_images[o])
        }
    }

    for (var val of propertyFormData.values()) {
        console.log(val);
     }

    const response = await fetch("/api/accomodations",{
        method: "POST",
        headers: {
            "Accepts":"application/json"
        },
        body: propertyFormData
    });
    const content = await response.json();
    console.log(content);
}