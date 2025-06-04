'use client'
import { Customers, HistoryCalculator } from "@/lib/generated/prisma"
import axios from "axios"
import { useEffect, useState } from "react"

export interface CustomerFormat extends Customers {
    HistoryCalculator : HistoryCalculator[]
}


export const useLoadMemberOrganization = (org_id: number | string) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<CustomerFormat[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const resData = await axios.get(`/api/organization/${org_id}/members`)
                if (resData && resData.data && resData.data.status === true) {
                    setData(resData.data.members)
                } else {
                    setData([])
                }
            } catch (error) {
                setData([])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [org_id])

    console.log(data)

    return {
        data,
        loading
    }
}