import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'

const CreateApi = createApi({
        baseQuery:fetchBaseQuery({
            baseUrl:"https://e005-2401-4900-1ca3-a933-7529-c426-5295-382c.ngrok-free.app/api/v1",
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