import React from 'react'

function Header({data}) {
    console.log('Header',data)
    return (
        <div>     
            {data.tit}                   
        </div>
    )
}

export default Header
