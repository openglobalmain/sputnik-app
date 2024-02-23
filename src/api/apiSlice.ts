import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
});

const dynamicBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const urlEnd = typeof args === "string" ? args : args.url;
    const adjustedUrl = `/${urlEnd}`;
    const adjustedArgs =
        typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl };
    return baseQuery(adjustedArgs, api, extraOptions);
};

export const dummyApi = createApi({
    reducerPath: "dummyApi",
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({
        fetchData: builder.query<any, string>({
            query: (endpoint) => endpoint,
        }),
        postData: builder.mutation<any, string>({
            query: (postData) => ({
                url: postData,
                method: "POST",
            }),
        }),
        deleteData: builder.mutation<any, string>({
            query: (deleteData) => ({
                url: deleteData,
                method: "DELETE",
            }),
        }),
        putData: builder.mutation<any, string>({
            query: (putData) => ({
                url: putData,
                method: "PUT",
            }),
        }),
        patchData: builder.mutation<any, string>({
            query: (patchData) => ({
                url: patchData,
                method: "PATCH",
            }),
        }),
    }),
});



