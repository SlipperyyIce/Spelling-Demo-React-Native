import React from 'react'

import GenerateStack from './generateStack'
import { root } from './routes'

export const AppNavigation = () => {
    return <GenerateStack paths={root} />
}
