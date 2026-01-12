import React, { useState } from 'react'
import { RepeatIcon } from './RepeatIcon'

function SelectDrobDown({RepeatType, setRepeatType , onClick}) {

    
    // const handleSelectedTypeChange = (e) => {
    //     setSelectedType(e.target.value)
    // }

    
  return (                     <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '10cap',
                    //   height: '20cap',
                      backgroundColor: 'var(--button-color-checked)',
                      zIndex: 99999,
                      borderRadius: 'var(--global-border-radius)',
                      padding: '1cap',
                      
                    }}
                    >

                  {
                      RepeatType.map((item , index) => (
                          <div 
                          onClick={() => {
                            onClick()
                            setRepeatType(RepeatType.map((type) => {
                                if (type.value === item.value) {
                                    return { ...type, selected: true }
                                }
                                return { ...type, selected: false }
                            }))
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // gap: '1cap',
                            // width: '100%',
                            // height: '100%',
                            // backgroundColor: 'var(--secondary-color)',
                            // borderRadius: 'var(--global-border-radius)',
                            borderBottom: index !== RepeatType.length - 1 ? '.9px solid var(--text-color-secondary)' : 'none',
                            paddingBottom: '1cap',
                        }}
                        key={item.value}>
                            <p
                            style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: 'var(--text-color)',
                              margin: 0,
                              padding: 0,
                              textAlign: 'left',
                              color: item.selected ? 'var(--primary-color)' : 'var(--text-color-secondary)',
                            }}
                            >{item.label}</p>
                            <p>{item.selected}</p>
                                
                            <RepeatIcon 
                            color={item.selected ? 'var(--primary-color)' : 'var(--text-color-secondary)'} 
                            />

                            
                        </div>
                    ))
                }  

                </div>

  )
}

export default SelectDrobDown