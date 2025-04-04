"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { useDebugInfo } from "@/hooks/use-football-api"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react"

export function ApiDebugPanel() {
  const { debugInfo, loading, error } = useDebugInfo()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Debug Information</CardTitle>
          <CardDescription>Loading API status and configuration details...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Debug Information</CardTitle>
          <CardDescription>Error fetching debug information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-md">
            <p>{error.message}</p>
          </div>
          <Button onClick={handleRefresh} className="mt-4" variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>API Debug Information</CardTitle>
            <CardDescription>Status and configuration details for the football-data.org API</CardDescription>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">API Key Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Key Available:</span>
                  <span className="font-medium flex items-center">
                    {debugInfo?.apiKeyAvailable ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Yes
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        No
                      </>
                    )}
                  </span>
                </div>
                {debugInfo?.apiKeyAvailable && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Key Preview:</span>
                    <span className="font-medium">{debugInfo?.apiKeyFirstChars}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Key Valid:</span>
                  <span className="font-medium flex items-center">
                    {debugInfo?.apiKeyValid ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Yes
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        No
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Environment</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Node Environment:</span>
                  <Badge variant={debugInfo?.env === "production" ? "default" : "secondary"}>{debugInfo?.env}</Badge>
                </div>
              </div>
            </div>
          </div>

          {debugInfo?.apiResponse && (
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">API Response</h3>
              <div className="space-y-2">
                {debugInfo.apiResponse.status && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status Code:</span>
                    <Badge
                      variant={
                        debugInfo.apiResponse.status >= 200 && debugInfo.apiResponse.status < 300
                          ? "default"
                          : "destructive"
                      }
                    >
                      {debugInfo.apiResponse.status}
                      {debugInfo.apiResponse.statusText ? ` (${debugInfo.apiResponse.statusText})` : ""}
                    </Badge>
                  </div>
                )}
                {debugInfo.apiResponse.competitionsCount !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Competitions Count:</span>
                    <span className="font-medium">{debugInfo.apiResponse.competitionsCount}</span>
                  </div>
                )}
                {debugInfo.apiResponse.error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md mt-2">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <p>{debugInfo.apiResponse.error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>
              Note: If you're experiencing issues with the API, please check your API key and ensure it's correctly set
              as the <code>NEXT_PUBLIC_FOOTBALL_DATA_API_KEY</code> environment variable.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

