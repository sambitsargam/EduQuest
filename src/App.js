// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { OCConnect } from '@opencampus/ocid-connect-js';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //


const opts = {
    redirectUri: 'http://localhost:3000/redirect',
    referralCode: 'PARTNER6'
};
const App = () => (
    <ThemeCustomization>
        <ScrollTop>
        <OCConnect opts={opts} sandboxMode={true}>
            <Routes />
        </OCConnect>
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
