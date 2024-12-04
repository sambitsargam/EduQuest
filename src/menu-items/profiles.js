// assets
import { UserOutlined, GroupOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined,
    GroupOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const profiles = {
    id: 'group-profile',
    title: 'Profile',
    type: 'group',
    children: [
        {
            id: 'my-profile',
            title: 'My Profile',
            type: 'item',
            url: '/profile',
            icon: icons.UserOutlined,
            breadcrumbs: true
        },
        {
            id: 'experts',
            title: 'Teachers',
            type: 'item',
            url: '/experts',
            icon: icons.GroupOutlined,
            breadcrumbs: true
        }
    ]
};

export default profiles;
