"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function ApiStatusIndicator() {
  const [status, setStatus] = useState<{
    isConnected: boolean
    message: string
    timestamp: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/status")
        const data = await response.json()
        setStatus(data)
      } catch (error) {
        console.error("Error checking API status:", error)
        setStatus({
          isConnected: false,
          message: "Error checking API status",
          timestamp: new Date().toISOString(),
        })
      } finally {
        setLoading(false)
      }
    }

    checkStatus()
  }, [])

  if (loading) {
    return (
      <Badge variant="outline" className="gap-1 bg-gray-100/10">
        <AlertCircle className="h-3 w-3 text-yellow-500" />
        <span>Checking API...</span>
      </Badge>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Badge variant="outline" className={`gap-1 ${status?.isConnected ? "bg-green-100/10" : "bg-red-100/10"}`}>
              {status?.isConnected ? (
                <CheckCircle className="h-3 w-3 text-green-500" />
              ) : (
                <XCircle className="h-3 w-3 text-red-500" />
              )}
              <span>{status?.isConnected ? "API Connected" : "Using Mock Data"}</span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{status?.message}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Last checked: {new Date(status?.timestamp || "").toLocaleTimeString()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

