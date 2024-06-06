import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie'

const CreateApi = createApi({
        baseQuery:fetchBaseQuery({
<<<<<<< HEAD
            baseUrl:"https://rndnc-2401-4900-1ca3-a933-14ba-7883-e9e6-3958.a.free.pinggy.link/api/v1",
=======
            baseUrl:"http://localhost:8080/api/v1",
>>>>>>> 062124104ffeb553c41dc1b5922d73e4754a683b
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