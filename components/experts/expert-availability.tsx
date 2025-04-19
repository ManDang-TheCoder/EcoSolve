"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ExpertAvailabilityProps {
  expertId: string
}

export function ExpertAvailability({ expertId }: ExpertAvailabilityProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // In a real app, you would fetch availability data based on the expert ID and date
  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    setSelectedTime(null)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isPast = (day: number) => {
    const today = new Date()
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return checkDate < new Date(today.setHours(0, 0, 0, 0))
  }

  const renderCalendar = () => {
    const days = []
    const totalDays = firstDayOfMonth + daysInMonth
    const totalCells = Math.ceil(totalDays / 7) * 7

    for (let i = 0; i < totalCells; i++) {
      const day = i - firstDayOfMonth + 1

      if (i < firstDayOfMonth || day > daysInMonth) {
        days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
      } else {
        days.push(
          <button
            key={`day-${day}`}
            onClick={() => !isPast(day) && handleDateSelect(day)}
            disabled={isPast(day)}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
              isSelected(day)
                ? "bg-emerald-600 text-white"
                : isToday(day)
                  ? "border border-emerald-600 text-emerald-600"
                  : isPast(day)
                    ? "text-muted-foreground opacity-50"
                    : "hover:bg-muted"
            }`}
          >
            {day}
          </button>,
        )
      }
    }

    return days
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <h3 className="text-sm font-medium">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>

      <div className="mb-4 grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      {selectedDate && (
        <div>
          <h4 className="mb-2 text-sm font-medium">
            Available on{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h4>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className={selectedTime === time ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                size="sm"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>

          {selectedTime && (
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Calendar className="mr-2 h-4 w-4" />
              Book Consultation
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
