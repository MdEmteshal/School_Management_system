import { useEffect } from "react"
import axios from "axios"
import { backendUrl } from "../App"
import { setAdminData } from "../redux/adminSlice"
import { useDispatch } from "react-redux"
export const getAdminDataHooks = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchAdmin() {
            try {
                const result = await axios.get(backendUrl + "/admin/auth/getadmin", { withCredentials: true })
                console.log("get custom hooks data", result.data)
                dispatch(setAdminData(result.data))
            } catch (error) {
                console.log("Backend error message:",
                    error?.response?.data?.message
                )
                dispatch(setAdminData(null))
                console.log("getuser error from customHooks")
            }
        }
        fetchAdmin()
    }, [])
}
