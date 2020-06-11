import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SearchIcon from '@material-ui/icons/Search';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My profile" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItem>
    </div>
);