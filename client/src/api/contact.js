export const createContact = async (values) => {
    try {
        const res = await fetch("http://localhost:5000/api/base/create-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                template: values.template,
                contact: {
                    "email": values.email,
                    "firstName": values.firstName,
                    "lastName": values.lastName,
                    "fieldValues":[
                        {
                            "field":"1",
                            "value":"The Value for First Field"
                        }
                    ]
                }
            }),
        });

        return await res.json();
    } catch (e) {
        console.error(e);
    }
};
