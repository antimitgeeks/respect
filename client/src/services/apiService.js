import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'

const CreateApi = createApi({
        baseQuery:fetchBaseQuery({
            baseUrl:"http://localhost:8080/api/v1",
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