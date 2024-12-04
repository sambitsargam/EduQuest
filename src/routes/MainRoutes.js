import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// render - dashboar

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const MyQuestions = Loadable(lazy(() => import('pages/extra-pages/MyQuestions')));
const AskQuestion = Loadable(lazy(() => import('pages/extra-pages/AskQuestion')));
const LatestQuestions = Loadable(lazy(() => import('pages/extra-pages/LatestQuestions')));
const Question = Loadable(lazy(() => import('pages/extra-pages/Question')));
const LivePeer = Loadable(lazy(() => import('pages/extra-pages/LivePeer')));

// render - Profiles
const UserProfile = Loadable(lazy(() => import('pages/user-profile/UserProfile')));
const Connect = Loadable(lazy(() => import('pages/user-profile/Connect')));
const Experts = Loadable(lazy(() => import('pages/user-profile/Experts')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {

    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <LatestQuestions />
        },
        {
            path: 'redirect',
            element: <LatestQuestions />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'livepeer',
            element: <LivePeer />
        },
        {
            path: 'my-questions',
            element: <MyQuestions />
        },
        {
            path: 'ask-question',
            element: <AskQuestion />
        },
        {
            path: 'latest-questions',
            element: <LatestQuestions />
        },
        {
            path: 'profile/:id',
            element: <UserProfile />
        },
        {
            path: 'connect/:id',
            element: <Connect />
        },
        {
            path: 'profile',
            element: <UserProfile />
        },
        {
            path: 'question/:id',
            element: <Question />
        },
        
        {
            path: 'experts',
            element: <Experts />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
