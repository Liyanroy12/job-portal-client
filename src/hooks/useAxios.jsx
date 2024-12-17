import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-for-recruiter-part3-bay.vercel.app',
    withCredentials: true
})

const useAxios = () => {

    const { signOutUser } = useAuth();
    const nevigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log("error caught in interceptor", error);

            if (error.status === 401 || error.status === 403) {
                console.log('need to logout the user');
                signOutUser()
                    .then(() => {
                        console.log("logged out user");
                        Navigate('/signIn')
                    })
                    .catch(error => console.log(error.message))
            }
            return Promise.reject(error);
        })
    }), []
    return axiosInstance;
};

export default useAxios;