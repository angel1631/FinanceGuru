import { Home } from '../Components/Home';
import {Layout} from '../Components/Layout';
import {NavBar} from '../Components/NavBar';
import {ContextProvider} from '../Context';
function MyApp({ Component, pageProps}) {
    return (
        <ContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ContextProvider>
            
          
    )
  }
  
  export default MyApp