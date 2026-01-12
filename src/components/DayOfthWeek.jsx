import React, { useEffect } from 'react'
import { daysOfWeek } from '../Logic/DaysOfTheWeek'

export default function DayOfthWeek({ selectedDays, setSelectedDays }) {
 
  
  let days 

  useEffect(() => {
    console.log(daysOfWeek)
    console.log("daysOfWeek")
    if (!daysOfWeek) {
      return 
    }
  }, [])

  return (
    <div
    style={{
      display: 'flex',
    //   gridTemplateColumns: 'repeat(2, 1fr)',
      flexDirection: 'row',
      gap: '1cap',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   gap: '.4cap',
    //   width: '10cap',
    width: '100%',
    // flexWrap: 'wrap',
    // flexFlow: 'row wrap',
    overflowX: 'scroll',
    }}
    >
      {

daysOfWeek.map((day, index) => (
          <div
          onClick={() => {
            if (selectedDays.includes(index)) {
                setSelectedDays(selectedDays.filter(day => day !== index))
            } else {
                setSelectedDays([...selectedDays, index])
            }
          }}
        key={index}
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.4cap',
            // width: '100%',
            border: '1px solid var(--text-color-secondary-hover)',
            borderRadius: '999px',
            padding: '1.4cap',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'center',
            backgroundColor: 'var(--button-color-checked)',
            backgroundColor: selectedDays.includes(index) ? 'var(--button-color-checked)' : 'transparent',
            border: selectedDays.includes(day) ? '1px solid var(--text-color-secondary-hover)' : '1px solid var(--text-color-secondary-hover)',
            borderRadius: '999px',
            padding: '1.4cap',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'center',
            width: '10cap',
        }}
        >
            <p
            style={{
              margin: 0,
              padding: 0,
              fontSize: '14px',
              fontWeight: '600',
              // textAlign: 'left',
              color: 'var(--text-color-secondary)',
            }}
            >
              {day}
            </p>
          </div>
        ))
      }
      
    </div>
  )
}
