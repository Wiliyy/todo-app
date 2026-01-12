import React from 'react'

function CalenderCard({cardWidth, cardHeight , upperHieght , LeftWidth , RightWidth , dayFontSize , monthFontSize, onClick, selectedDay, setSelectedDay, viewMonth, months}) {

    let width = cardWidth || '100%';
    let height = cardHeight || '100%';
    let dayFontSizeWidth = dayFontSize || '15em';
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
                    <p>
                        
                    </p>
                    <p

                        style={{
                            // fontSize: '15em',
                            fontSize: dayFontSizeWidth,
                            fontWeight: 'bold',
                            color: 'var(--text-color-secondary-hover)',
                            margin: '0',
                            // marginTop: '55px',
                            padding: '0',
                            textAlign: 'center',
                            // fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                            fontFamily: 'Heiti SC'
                        }}
                        >
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
    fontFamily: 'Heiti SC'
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