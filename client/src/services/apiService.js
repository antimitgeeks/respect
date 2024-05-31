import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'

const CreateApi = createApi({
        baseQuery:fetchBaseQuery({
            baseUrl:"https://ba9e-2401-4900-1c08-1174-38ae-aa5a-6b25-f3b3.ngrok-free.app/api/v1",
            prepareHeaders: (headers) => {

                const user =Cookies.get('isLogged');
                console.log(user)
                if (user) {
                  headers.set("Authorization", `Bearer ${user}`);
                  // headers.set("Content-Type", "application/json");
                } else {
                  console.warn("Token is missing or empty");
                }
                return headers;
              },
        }),
        endpoints:()=>({}),
        tagTypes:["adminPanel"]

});

export default CreateApi;