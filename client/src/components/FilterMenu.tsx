import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

type FilterMenuProps = {
  onFilterSelect: (filter: string) => void;
};

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [seasonMenuAnchor, setSeasonMenuAnchor] = useState<null | HTMLElement>(null);
  const [styleMenuAnchor, setStyleMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleMainClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAll = () => {
    setAnchorEl(null);
    setSeasonMenuAnchor(null);
    setStyleMenuAnchor(null);
  };

  const handleSelect = (filter: string) => {
    setSelectedFilter(filter || null);
    onFilterSelect(filter);
    handleCloseAll();
  };

  return (
    <div>
      <Tooltip title={selectedFilter ? `מסונן לפי: ${selectedFilter}` : 'ללא סינון'}>
        <IconButton onClick={handleMainClick} color="primary" 
        sx={{
          border:null
        }}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseAll}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 180,
            backgroundColor: '#fdfdfd',
          }
        }}
      >
       {/* No filtering */}
        <MenuItem
          onClick={() => handleSelect('')}
          sx={{
            borderRadius: 1,
            mx: 1,
            my: 0.5,
            fontWeight: !selectedFilter ? 'bold' : 'normal',
            backgroundColor: !selectedFilter ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.12)',
            }
          }}
        >
          <ListItemText primary="ללא סינון" />
        </MenuItem>

      {/* By season */}
        <MenuItem
          onClick={(e) => {
            setSeasonMenuAnchor(e.currentTarget);
            setStyleMenuAnchor(null);
          }}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
            borderRadius: 1,
            mx: 1,
            my: 0.5,
          }}
        >
          <ListItemText primary="לפי עונה" />
          <ListItemIcon>
            <ArrowRightIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        {/* By style */}
        <MenuItem
          onClick={(e) => {
            setStyleMenuAnchor(e.currentTarget);
            setSeasonMenuAnchor(null);
          }}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
            borderRadius: 1,
            mx: 1,
            my: 0.5,
          }}
        >
          <ListItemText primary="לפי סגנון" />
          <ListItemIcon>
            <ArrowRightIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>

      {/* Season submenu */}
      <Menu
        anchorEl={seasonMenuAnchor}
        open={Boolean(seasonMenuAnchor)}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => handleSelect("חורף")}>חורף</MenuItem>
        <MenuItem onClick={() => handleSelect("קיץ")}>קיץ</MenuItem>
        <MenuItem onClick={() => handleSelect("כללי")}>כללי</MenuItem>
      </Menu>

     {/* Style submenu */}
      <Menu
        anchorEl={styleMenuAnchor}
        open={Boolean(styleMenuAnchor)}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => handleSelect("ביסיק")}>ביסיק</MenuItem>
        <MenuItem onClick={() => handleSelect("ספורט")}>ספורט</MenuItem>
        <MenuItem onClick={() => handleSelect("ספורט-אלגנט")}>ספורט-אלגנט</MenuItem>
        <MenuItem onClick={() => handleSelect("אלגנט")}>אלגנט</MenuItem>
      </Menu>
    </div>
  );
};

export default FilterMenu;