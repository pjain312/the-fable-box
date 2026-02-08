import axios from "axios"

export const createOrder = async (payload) => {
    try {
        const response = await axios.post(
            'https://api.razorpay.com/v1/orders',
            payload, // Request body/payload
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`rzp_test_SDMWaGsTi8uLKR:K1roBpvymUMa5AJk1AFimv61`)}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.error('Error creating order:', error)
        throw error
    }
}