import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StandingsTableSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <Skeleton className="h-8 w-200" />
        <Skeleton className="h-4 w-200" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-12">Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">MP</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GA</TableHead>
                <TableHead className="text-center">GD</TableHead>
                <TableHead className="text-center">Pts</TableHead>
                <TableHead className="text-center">Form</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-6 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

