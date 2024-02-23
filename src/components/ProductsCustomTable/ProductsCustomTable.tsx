import React from 'react';

import { Box, Grommet, DataTable } from 'grommet';
import { Blank } from 'grommet-icons';

const SortableIcon = () => (
  <Blank color="text-xweak" opacity="0.3">
    <g fill="none" stroke="#000" strokeWidth="2">
      <path d="M 6 10 L 12 6 L 18 10" />
      <path d="M 6 14 L 12 18 L 18 14" />
    </g>
  </Blank>
);

const customTheme = {
  global: {
    font: {
      family: 'Helvetica',
    },
  },
  dataTable: {
    header: {
      color: 'text-strong',
      extend: ({ column, sort, sortable }) => `
          ${
            sortable &&
            sort &&
            sort.property !== column &&
            `
              :hover {
                svg {
                  opacity: 100%;
                }
              }
            `
          }
         `,
    },
    icons: {
      sortable: SortableIcon,
    },
  },
};

export const ProductsCustomTable = () => {
  const [sort, setSort] = React.useState({
    property: 'name',
    direction: 'desc',
  });
  return (
    <Grommet theme={customTheme}>
      <Box align="center" pad="large">
        <DataTable
          columns={columns}
          data={DATA}
          step={10}
          sort={sort}
          onSort={setSort}
        />
      </Box>
    </Grommet>
  );
};