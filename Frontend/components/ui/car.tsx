import type React from "react"

interface CarProps {
  children: React.ReactNode
}

export const Car: React.FC<CarProps> = ({ children }) => {
  return <>{children}</>
}
