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
                        invalidatesTags:['npopage'],
                        query:({Id,data})=>(
                            {
                                url:`/npos/page/${Id}`,
                                method:'POST',
                                body:data
                            }
                        )
                    }
                )
            }
        )
    }
);

export const  { useGetPageByIdQuery, useAddPageMutation,useUploadFileMutation}= NpoPageService;