import React from 'react'
import { daysOfWeek } from '../Logic/DaysOfTheWeek';

function CalenderCard({cardWidth, cardHeight , upperHieght , LeftWidth , RightWidth , dayFontSize , monthFontSize, onClick, selectedDay, setSelectedDay, viewMonth, months , dayNumberFontSize , viewYear}) {

    // const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const days = daysOfWeek
    let width = cardWidth || '100%';
    let height = cardHeight || '100%';
    let dayFontSizeWidth = dayFontSize || '15em';
    let dayNumberFontSizeWidth = dayNumberFontSize || '15em';
    let monthFontSizeWidth = monthFontSize || '4em';
    let upperHieghtWidth = upperHieght || '25%';
    let LeftWidthWidth = LeftWidth || '100%';
    let RightWidthWidth = RightWidth || '100%';

  return (
    <div
                    onClick={onClick}
                    className='filter-buttons-date-container'
                    style={{
                        // marginTop:'7%',
                        minWidth: width,
                        height: height,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // alignSelf: 'center',
                        // justifySelf: 'center',
                        cursor: 'pointer',
                        gap: '0.1cap',
                        height:  '100%',
                    }}


                >

                    <div
                        className='filter-buttons-date-container-upper'
                            style={{
                                height: upperHieghtWidth,
                            }}
                        >
                        <div
                        
                        style={{
                            width: LeftWidthWidth,
                        }}
                        className='filter-buttons-date-container-upper-left'>

                        </div>
                        <div
                        style={{
                            width: RightWidthWidth,
                        }}
                        className='filter-buttons-date-container-upper-right'>

                        </div>
                    </div>

                    {/* <div
                    
                    style={{
                        height: '20%',
                        width: '100%',
                        backgroundColor: 'red',
                    }}>
                    </div> */}
                    <div
                    
                    style={{
                        marginTop: '20%',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4cap',
                        // backgroundColor: 'blue',
                    }}
                    >

                    
                    <p

style={{
    // fontSize: '5.8em',
    fontSize: dayFontSizeWidth,
    fontWeight: 'bold',
    color: 'var(--text-color-secondary-hover)',
    margin: '0',
    // marginTop: '55px',
    padding: '0',
    textAlign: 'center',
    // fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontFamily: 'Heiti SC',
    textTransform: 'capitalize',
    padding: '0',
    margin: '0',
}}
>
                            {days[new Date(viewYear, viewMonth, selectedDay).getDay()] || days[new Date().getDay()]}
                        {/* {selectedDay || new Date().getDate()} */}
                    </p>
                    <p

style={{
    // fontSize: '15em',
    fontSize: monthFontSizeWidth,
    fontWeight: 'bold',
    color: 'var(--text-color-secondary-hover)',
    margin: '0',
    // marginTop: '55px',
    padding: '0',
    textAlign: 'center',
    // fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontFamily: 'Heiti SC',
    padding: '0',
    margin: '0',
}}
>
                            {/* {days[selectedDay] || days[new Date().getDay()]} */}
                        {selectedDay || new Date().getDate()}
                    </p>
                    <p

style={{
    fontSize: monthFontSizeWidth,
    // fontSize: '4em',
    // fontWeight:'bold',
    color: 'var(--text-color-secondary-hover)',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    fontFamily: 'Heiti SC',
    padding: '0',
    margin: '0',
                            // fontFamily: 'Formula Condensed',
                        }}
                    >
                        {
                            months && viewMonth ?
                            months[viewMonth] :
                            new Date().toLocaleString('default', { month: 'long' })
                        }
                    </p>
                    </div>
                </div>
  )
}

export default CalenderCard







{/* <div
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                width:'100%',
            }}
            >
                <div>   
                        <h1 className='filter-buttons-title'> CATEGORIES {selectedTag ? `(${selectedTag.label})` : ''}</h1>
                </div>

                <div
                className='filter-buttons-date-container'
                style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                }}

                
                >

                    <div
                    className='filter-buttons-date-container-upper'
                    >
                            <div className='filter-buttons-date-container-upper-left'>
                                
                            </div>
                            <div className='filter-buttons-date-container-upper-right'>
                                
                            </div>
                    </div>
                    <p
                    
                    style={{
                        fontSize:'3em',
                        fontWeight:'bold',
                        color:'var(--text-color)',
                        margin:'0',
                        marginTop:'25%',
                        padding:'0',
                        textAlign:'center',
                        fontFamily:'Formula Condensed',
                    }}
                    >
                        {new Date().getDate()}
                    </p>
                    <p
                    
                    style={{
                        fontSize:'1.5em',
                        // fontWeight:'bold',
                        color:'var(--text-color)',
                        margin:'0',
                        padding:'0',
                        textAlign:'center',
                        fontFamily:'Formula Condensed',
                    }}
                    >
                        {new Date().toLocaleString('default', { month: 'long' })}
                    </p>
                </div>
            </div> */}