"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState("goals")

  
  const topScorersData = [
    { name: "Erling Haaland", value: 36, fill: "#4ade80" },
    { name: "Harry Kane", value: 30, fill: "#2563eb" },
    { name: "Ivan Toney", value: 20, fill: "#f59e0b" },
    { name: "Marcus Rashford", value: 17, fill: "#ef4444" },
    { name: "Gabriel Martinelli", value: 15, fill: "#8b5cf6" },
  ]

  const teamGoalsData = [
    { name: "Man City", scored: 94, conceded: 33 },
    { name: "Arsenal", scored: 88, conceded: 43 },
    { name: "Liverpool", scored: 75, conceded: 47 },
    { name: "Tottenham", scored: 70, conceded: 63 },
    { name: "Newcastle", scored: 68, conceded: 33 },
  ]

  const leagueComparisonData = [
    { name: "Premier League", avgGoals: 2.85, teams: 20, matches: 380 },
    { name: "La Liga", avgGoals: 2.51, teams: 20, matches: 380 },
    { name: "Bundesliga", avgGoals: 3.21, teams: 18, matches: 306 },
    { name: "Serie A", avgGoals: 2.72, teams: 20, matches: 380 },
    { name: "Ligue 1", avgGoals: 2.81, teams: 20, matches: 380 },
  ]

  const seasonTrendsData = [
    { month: "Aug", goals: 95, cards: 120 },
    { month: "Sep", goals: 105, cards: 140 },
    { month: "Oct", goals: 110, cards: 135 },
    { month: "Nov", goals: 120, cards: 150 },
    { month: "Dec", goals: 130, cards: 170 },
    { month: "Jan", goals: 125, cards: 160 },
    { month: "Feb", goals: 115, cards: 145 },
    { month: "Mar", goals: 120, cards: 155 },
    { month: "Apr", goals: 135, cards: 165 },
    { month: "May", goals: 145, cards: 180 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Football Statistics</h1>
            <p className="text-muted-foreground">Explore detailed statistics from top football leagues</p>
          </div>

          <Tabs defaultValue="goals" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="leagues">Leagues</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Goal Scorers</CardTitle>
                  <CardDescription>Premier League 2022/23 season</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topScorersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Goals" radius={[4, 4, 0, 0]}>
                          {topScorersData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Goals by Position</CardTitle>
                    <CardDescription>Distribution across player positions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Forwards", value: 65 },
                              { name: "Midfielders", value: 25 },
                              { name: "Defenders", value: 8 },
                              { name: "Own Goals", value: 2 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {[0, 1, 2, 3].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goal Types</CardTitle>
                    <CardDescription>How goals were scored</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Open Play", value: 72 },
                              { name: "Set Piece", value: 15 },
                              { name: "Penalty", value: 8 },
                              { name: "Counter Attack", value: 5 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {[0, 1, 2, 3].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="teams" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Goals Analysis</CardTitle>
                  <CardDescription>Goals scored vs. conceded by top teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamGoalsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="scored" name="Goals Scored" fill="#4ade80" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="conceded" name="Goals Conceded" fill="#f87171" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Home vs. Away Performance</CardTitle>
                    <CardDescription>Points earned at home vs. away</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "Man City", home: 52, away: 37 },
                            { name: "Arsenal", home: 45, away: 42 },
                            { name: "Man United", home: 42, away: 33 },
                            { name: "Newcastle", home: 38, away: 33 },
                            { name: "Liverpool", home: 35, away: 32 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="home" name="Home Points" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="away" name="Away Points" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team Discipline</CardTitle>
                    <CardDescription>Yellow and red cards by team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "Leeds", yellow: 101, red: 5 },
                            { name: "Everton", yellow: 95, red: 4 },
                            { name: "Tottenham", yellow: 90, red: 3 },
                            { name: "Fulham", yellow: 87, red: 3 },
                            { name: "Crystal P", yellow: 85, red: 2 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="yellow" name="Yellow Cards" fill="#facc15" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="red" name="Red Cards" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="leagues" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>League Comparison</CardTitle>
                  <CardDescription>Key metrics across top European leagues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leagueComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgGoals" name="Avg. Goals per Game" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>League Competitiveness</CardTitle>
                    <CardDescription>Points gap between positions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "PL", top3: 14, mid: 8, bottom: 11 },
                            { name: "La Liga", top3: 17, mid: 6, bottom: 9 },
                            { name: "Bundesliga", top3: 12, mid: 10, bottom: 8 },
                            { name: "Serie A", top3: 18, mid: 7, bottom: 10 },
                            { name: "Ligue 1", top3: 25, mid: 5, bottom: 7 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="top3" name="Top 3 Gap" fill="#4ade80" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="mid" name="Mid-table Gap" fill="#facc15" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="bottom" name="Relegation Gap" fill="#f87171" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>League Attendance</CardTitle>
                    <CardDescription>Average attendance by league</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "Bundesliga", value: 43000 },
                            { name: "Premier League", value: 40000 },
                            { name: "La Liga", value: 29000 },
                            { name: "Serie A", value: 27000 },
                            { name: "Ligue 1", value: 23000 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Avg. Attendance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Season Trends</CardTitle>
                  <CardDescription>Goals and cards throughout the season</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={seasonTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="goals"
                          name="Goals"
                          stroke="#3b82f6"
                          activeDot={{ r: 8 }}
                        />
                        <Line yAxisId="right" type="monotone" dataKey="cards" name="Cards" stroke="#f87171" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Timing</CardTitle>
                    <CardDescription>When goals are scored during matches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "0-15", value: 12 },
                            { name: "16-30", value: 15 },
                            { name: "31-45", value: 18 },
                            { name: "45+", value: 8 },
                            { name: "46-60", value: 16 },
                            { name: "61-75", value: 19 },
                            { name: "76-90", value: 22 },
                            { name: "90+", value: 10 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Goals" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Season Progression</CardTitle>
                    <CardDescription>Points accumulation by top teams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { gameweek: 5, city: 13, arsenal: 12, united: 9, newcastle: 6, liverpool: 5 },
                            { gameweek: 10, city: 26, arsenal: 27, united: 19, newcastle: 18, liverpool: 10 },
                            { gameweek: 15, city: 35, arsenal: 37, united: 26, newcastle: 30, liverpool: 22 },
                            { gameweek: 20, city: 45, arsenal: 50, united: 39, newcastle: 39, liverpool: 29 },
                            { gameweek: 25, city: 58, arsenal: 60, united: 49, newcastle: 47, liverpool: 35 },
                            { gameweek: 30, city: 70, arsenal: 72, united: 59, newcastle: 56, liverpool: 47 },
                            { gameweek: 35, city: 82, arsenal: 81, united: 66, newcastle: 65, liverpool: 59 },
                            { gameweek: 38, city: 89, arsenal: 87, united: 75, newcastle: 71, liverpool: 67 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="gameweek" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="city" name="Man City" stroke="#1d4ed8" />
                          <Line type="monotone" dataKey="arsenal" name="Arsenal" stroke="#ef4444" />
                          <Line type="monotone" dataKey="united" name="Man United" stroke="#b91c1c" />
                          <Line type="monotone" dataKey="newcastle" name="Newcastle" stroke="#000000" />
                          <Line type="monotone" dataKey="liverpool" name="Liverpool" stroke="#15803d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

