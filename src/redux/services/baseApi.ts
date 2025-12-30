import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl : "https://python-microservice-hub.el.r.appspot.com/api/v1",
        credentials : 'include',
        prepareHeaders : (headers) => {
            headers.set('content-type','application/json')
            return headers
        },
    }),
tagTypes : ['parentcategories','childcategories','products'],
endpoints : () =>({})
})