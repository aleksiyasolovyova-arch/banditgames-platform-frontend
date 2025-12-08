import { PropagateLoader } from "react-spinners"

interface LoadingSpinnerProps {
    color?: string
    size?: number
}

export const LoadingSpinner = ({
                                   color = "white",
                                   size = 16
                               }: LoadingSpinnerProps) => {
    return <PropagateLoader color={color} size={size} />
}