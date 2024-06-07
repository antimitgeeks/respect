import CreateApi from "./apiService";

const NpoPageService = CreateApi.injectEndpoints(
    {
        endpoints:(builder)=>(
            {
                GetPageById: builder.query(
                    {
                        providesTags:['npopage'],
                        query:({Id})=>(
                            {
                                url:`/npos/page-details/${Id}`,
                                method:"POST"
                            }
                        )
                    }
                ),
                AddPage:builder.mutation(
                    {
                        invalidatesTags:['npopage'],
                        query:({Id,data})=>(
                            {
                                url:`/npos/page/${Id}`,
                                method:"POST",
                                body:data
                            }
                        )
                    }
                ),
                UploadFile:builder.mutation(
                    {
                        invalidatesTags:['npoimage'],
                        query:({Id,data,type})=>(
                            {
                                url:`/npos/upload/${Id}?type=${type}`,
                                method:'POST',
                                body:data
                            }
                        )
                    }
                ),
                // GetFile:builder.query(
                //     {
                //         providesTags:['npoimage'],
                //         query:({Id,type})=>(
                //             {
                //                 url:`/npos/image/${Id}?type=${type}`,
                //                 method:"POST"
                //             }
                //         )
                //     }
                // )
            }
        )
    }
);

export const  { useGetPageByIdQuery, useAddPageMutation,useUploadFileMutation}= NpoPageService;