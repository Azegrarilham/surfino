"use client"
import { useState } from "react"
import { Calendar, Clock, Users, Video, MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const lessons = [
  {
    id: 1,
    title: "Mathematics Tutoring",
    student: "Alice Johnson",
    time: "09:00 - 10:00",
    date: "2024-01-15",
    type: "video",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Piano Lesson",
    student: "Bob Smith",
    time: "14:00 - 15:00",
    date: "2024-01-15",
    type: "in-person",
    status: "pending",
  },
  {
    id: 3,
    title: "English Conversation",
    student: "Maria Garcia",
    time: "16:00 - 17:00",
    date: "2024-01-15",
    type: "video",
    status: "confirmed",
  },
  {
    id: 4,
    title: "Group Guitar Class",
    student: "3 students",
    time: "10:00 - 11:30",
    date: "2024-01-16",
    type: "in-person",
    status: "confirmed",
  },
]

export function LessonCalendar() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [viewMode, setViewMode] = useState("day")

  const filteredLessons = lessons.filter((lesson) => lesson.date === selectedDate)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lesson Calendar</h1>
          <p className="text-muted-foreground">Manage your teaching schedule and upcoming lessons</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="month">Month View</SelectItem>
          </SelectContent>
        </Select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border rounded-md"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredLessons.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No lessons scheduled for this day</p>
                </div>
              ) : (
                filteredLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{lesson.time}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {lesson.student}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.type === "video" ? (
                        <Badge variant="secondary">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          In-person
                        </Badge>
                      )}
                      <Badge variant={lesson.status === "confirmed" ? "default" : "secondary"}>{lesson.status}</Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Today's Lessons</span>
                <span className="font-medium">{filteredLessons.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Students</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Earnings (Week)</span>
                <span className="font-medium">$450</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="font-medium">Tomorrow</div>
                <div className="text-muted-foreground">5 lessons scheduled</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">This Weekend</div>
                <div className="text-muted-foreground">3 lessons scheduled</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Next Week</div>
                <div className="text-muted-foreground">15 lessons scheduled</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
