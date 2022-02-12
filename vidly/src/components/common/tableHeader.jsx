import React, { Component } from 'react';

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };  // clone existing sortColumn object

        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc': 'asc';  // set it to opposite of what it currently is
        else {
            sortColumn.path = path;  // set new path if the path is different
            sortColumn.order = 'asc';  // should be ascending whenever we sort on a new column
        } 

        this.props.onSort(sortColumn);  // raise the sort event
    };

    // encapsulates all the logic with determining the icon
    renderSortIcon = column => {
        // object destructuring
        const { sortColumn } = this.props;

        // see if this column here is different from the current sort column
        if (column.path !== sortColumn.path) return null;

        // otherwise this column is sorted so we need to render different icons depending on the sort order
        if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;

        // if none of these conditions evaluate to true that means this column is sorted in descending order
        return <i className="fa fa-sort-desc"></i>;
    };

    render() { 
        return (
            <thead>
                <tr>
                    { this.props.columns.map(column => 
                        <th 
                            className='clickable'
                            key={ column.path || column.key }
                            onClick={ () => this.raiseSort(column.path) }>
                            { column.label } 
                            { this.renderSortIcon(column) }
                        </th>
                    ) }
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;