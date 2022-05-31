// ** Next Imports
import Head from 'next/head'
import router, { Router } from 'next/router'
import React,{useState,useEffect} from 'react'
// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import LoginPage from './pages/login'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  const [authorized, setAuthorized] = useState(true);
 
  const userInfo=()=>{
    if(authorized){
     router.push('/pages/login')
    }
  }
  useEffect(() => {
   
    userInfo();
  }, [])
  return (
<>
      <Head>
        <title>FoodPort</title>
        <meta
          name='description'
          content='FoodPort is a platform for food delivery service providers to manage their deliveries and customers.'
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
{authorized &&
  
  <SettingsProvider>
  <SettingsConsumer>
    {({ settings }) => {
      return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
    }}
  </SettingsConsumer>
</SettingsProvider>

  }

  </>
  )

}

export default App
