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


    propertyFormData.append("landlord_id", args.queryKey[1].landlordId);
    propertyFormData.append("property_type", args.queryKey[1].property_type);
    propertyFormData.append("bedroom_count", args.queryKey[1].bedroom_count);
    propertyFormData.append("bathroom_count", args.queryKey[1].bathroom_count);
    propertyFormData.append("county", args.queryKey[1].county);
    propertyFormData.append("address", args.queryKey[1].address);
    propertyFormData.append("zip", args.queryKey[1].zip);
    propertyFormData.append("description", args.queryKey[1].description);
    propertyFormData.append("available_start", args.queryKey[1].available_start);
    propertyFormData.append("available_end", args.queryKey[1].available_end);
    propertyFormData.append("price_per_month", args.queryKey[1].price_per_month);
    propertyFormData.append("size_sq_meters", args.queryKey[1].size_sq_meters);
    propertyFormData.append("lat", args.queryKey[1].lat);
    propertyFormData.append("lng", args.queryKey[1].lng);
    propertyFormData.append("posting_type", args.queryKey[1].posting_type);
    propertyFormData.append("UNIFlex_available", args.queryKey[1].UNIFlex_available);
    propertyFormData.append("UNIBNB_available", args.queryKey[1].UNIBNB_available);
    propertyFormData.append("colleges", args.queryKey[1].colleges);
    propertyFormData.append("amenities", args.queryKey[1].amenities);

    property_images.forEach((file => {
        propertyFormData.append("property_images", file);
    }))

    for (var value of propertyFormData.keys()) {
        console.log(value);
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

export const getAccomodations = async () => { 

    const response = await fetch(`/api/accomodations`,{
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        "Accepts":"application/json"
        },
    });

    const content = await response.json();
    return content;
 }


 export const getAccomodationById = async (args) => { 

    var id = args.queryKey[1];

    const response = await fetch(`/api/accomodations/${id}`,{
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        "Accepts":"application/json"
        },
    });

    const content = await response.json();
    return content;
 }

 export const bookAccomodation = async (args) => {
    console.log(args.queryKey[1])
    const id = args.queryKey[1]._id
    const postingType = args.queryKey[1].postingType

    const params = {
        landlord_id: args.queryKey[1].landlordId,
        student_id: args.queryKey[1].studentId,
        agreement_type: args.queryKey[1].agreementType,
        start_date: args.queryKey[1].startDate,
        end_date: args.queryKey[1].endDate,
        flexi_days: args.queryKey[1].flexiDays,
        booked_dates: args.queryKey[1].bookedDates,
    };
    const response = await fetch(`/api/accomodations/${id}?action=${postingType}`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accepts":"application/json"
        },
        body: JSON.stringify(params)
    });
    const content = await response.json();
    return content;
}


export const getLandlordProperties = async (args) => { 

    var id = args.queryKey[1].id;

    console.log(id)

    const response = await fetch(`/api/accomodations/landlord/${id}`,{
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        "Accepts":"application/json"
        },
    });

    const content = await response.json();
    return content;
 }

 export const deleteAccomodation = async (args) => { 

    var id = args.queryKey[1].id;

    console.log(args.queryKey[1])

    const response = await fetch(`/api/accomodations/${id}?action=delete`,{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        "Accepts":"application/json"
        },
    });

    const content = await response.json();
    return content;
 }
