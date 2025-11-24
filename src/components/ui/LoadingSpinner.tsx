import React from "react";
import {PropagateLoader} from "react-spinners";

interface LoadingSpinnerProps {
    color?: string,
    size?: number}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({color = "white", size = 16}) => <PropagateLoader color={color} size={size} />;